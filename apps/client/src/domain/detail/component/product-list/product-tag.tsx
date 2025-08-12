import { forwardRef } from "react";

import type { TagType } from "@packages/shared";

type ProductTagProps = {
  tag: TagType;
};

export const ProductTag = forwardRef<HTMLDivElement, ProductTagProps>(({ tag }: ProductTagProps, ref) => {
  return (
    <div id={tag.tagName} className="px-2 py-1 font-semibold" ref={ref}>
      {tag.tagName}
    </div>
  );
});
