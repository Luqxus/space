import { v } from 'convex/values';
import { mutation, query } from './_generated/server'

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg'
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await context.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage
    });

    return board;
  }
});

export const update = mutation({
  args: {
    title: v.string(),
    id: v.id('boards')
  },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) throw new Error('Unauthorized');

    const title = args.title.trim()

    if (!title) throw new Error("Title is required");

    if (title.length > 60) throw new Error('Title cannot be longer than 60 characters');

    const board = await ctx.db.patch(args.id, { title: args.title });

    return board;
  }
});


export const favorite = mutation({
  args: { id: v.id('boards'), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error('Unauthorized');

    const board = await ctx.db.get(args.id)

    if (!board) throw new Error('Board not found');

    const userId = identity.subject;

    const exisitngFavorite = await ctx.db.query('userFavorites')
      .withIndex('by_user_board_org', q => q
        .eq('userId', userId)
        .eq('boardId', board._id)
        .eq('orgId', args.orgId)
      ).unique();

    if (exisitngFavorite) {
      await ctx.db.delete('userFavorites', exisitngFavorite._id)
      return
    }

    await ctx.db.insert('userFavorites', {
      boardId: board._id,
      orgId: board.orgId,
      userId: userId
    });

    return board;
  }
});


export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const favBoard = await ctx.db.query('userFavorites').withIndex('by_user_board', q =>
      q
        .eq('userId', identity.subject)
        .eq('boardId', args.id)
    ).unique()

    if (favBoard) {
      await ctx.db.delete('userFavorites', favBoard._id);
    }

    await ctx.db.delete(args.id);

  }
});


export const get = query({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  }
});
