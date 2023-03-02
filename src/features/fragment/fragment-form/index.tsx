import type { FC, ChangeEvent } from "react";
import Image from "next/image";
import { Textarea } from "~/ui-kit";

interface FragmentFormPropos {
  onDelete: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export const FragmentForm: FC<FragmentFormPropos> = ({
  onDelete,
  onChange,
  value,
}) => {
  return (
    <div className="relative">
      <button className="absolute right-4 top-4 z-10" onClick={onDelete}>
        <Image
          width={20}
          height={20}
          alt="delete"
          src={"/img/trash-outline.svg"}
        />
      </button>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={"Paste your fragment here"}
      />
    </div>
  );
};
