
"use client";

import Image from "next/image";
import type { LibraryItem } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@/components/ui/dialog";

interface ImageLibraryProps {
  items: LibraryItem[];
  onSelectImage: (url: string) => void;
}

export function ImageLibrary({ items, onSelectImage }: ImageLibraryProps) {
  // Create a unique set of image URLs from all items
  const imageUrls = Array.from(
    new Set(
        items.flatMap((item) => {
            if (item.images) return item.images;
            if (item.image) return [item.image];
            return [];
        })
    )
  );

  return (
    <div>
      <ScrollArea className="h-96">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
          {imageUrls.map((url, index) => (
            <DialogClose key={index} asChild>
                 <button
                    onClick={() => onSelectImage(url)}
                    className="relative aspect-square block w-full rounded-md overflow-hidden border-2 border-transparent focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none hover:border-primary transition-all"
                >
                    <Image
                        src={url}
                        alt={`Library image ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                </button>
            </DialogClose>
          ))}
        </div>
      </ScrollArea>
       <DialogClose id="close-image-library" className="hidden" />
    </div>
  );
}
