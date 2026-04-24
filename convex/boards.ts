import { v } from 'convex/values';
import { query } from './_generated/server'
import { favorite } from './board';


export const get = query({
  args: {
    orgId: v.string(),
    filter: v.optional(v.string()),
    favorites: v.optional(v.string())
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    let boards = [];

    const search = args.filter?.trim();

    if (!!search) {
      boards = await ctx.db.query('boards')
        .withSearchIndex('search_title', q =>
          q
            .search('title', search)
            .eq('orgId', args.orgId)
        ).collect()
    } else {
      boards = await ctx.db
        .query('boards')
        .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
        .order('desc')
        .collect();
    }

    const favoriteIds = (await ctx.db.query('userFavorites')
      .withIndex('by_user_org', q =>
        q.eq('userId', identity.subject)
          .eq('orgId', args.orgId)).collect()).map(fav => fav.boardId);

    console.log(favoriteIds)

    if (!!args.favorites) {
      return boards.filter(board => (favoriteIds as string[]).includes(board._id as string)).map(board => ({ ...board, favorite: true }));
    }

    return boards.map(board => {
      let fav = false;
      if ((favoriteIds as string[]).includes(board._id as string)) {
        fav = true
      }
      return {
        ...board,
        favorite: fav
      };
    });
  }
});


