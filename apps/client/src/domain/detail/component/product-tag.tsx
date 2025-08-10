import type { TagType } from "@packages/shared";

type ProductTagProps = {
  tag: TagType;
};

export const ProductTag = ({ tag }: ProductTagProps) => {
  return (
    <div id={`tag-${tag.id}`} className="px-2 py-1 font-semibold">
      {tag.tagName}
    </div>
  );
};
