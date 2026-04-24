'use client'
import { Hint } from '@/components/ui/hint';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type OrgItemProps = {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
  onOrgClick: (_id: string) => void
}

export const OrgItem = (props: OrgItemProps) => {
  return (
    <div
      className='aspect-square relative'
      onClick={() => props.onOrgClick(props.id)}
    >{
        <Hint
          label={props.name}
          side='right'
          align='start'>
          <Image
            src={props.imageUrl}
            alt='Org'
            height={64}
            width={64}
            className={cn(
              "rounded-md cursor-pointer opacity-75 hover:opacity-100",
              props.isActive && "opacity-100"
            )}
          />
        </Hint>
      }</div>
  );
}
