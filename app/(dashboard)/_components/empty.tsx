'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"

type EmptyBoardListProps = {
  placeholderImage?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const Empty = (props: EmptyBoardListProps) => {


  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8">
      {
        (props.placeholderImage) ?
          <Image
            src='/empty.webp'
            alt="Empty org"
            height={300}
            width={300} />
          : <></>
      }
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mt-6">
          {props.title}
        </h2>
        {
          (props.subtitle) ?
            <p className="text-muted-foreground text-sm mt-2">
              {props.subtitle}
            </p>
            : <></>
        }
      </div>
      {props.children}
    </div>
  )
}


