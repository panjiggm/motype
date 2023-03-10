import type { Category } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { Select } from "~/ui-kit";
import type { Option } from "~/ui-kit";
import { api } from "~/utils/api";
import { CategoryPopup } from "../category-popup";
import { useCategoryMutations } from "../use-category-mutations";

export const SelectCategory = () => {
  const categories = api.category.getAll.useQuery().data;
  const selectedCategory = api.category.getSelected.useQuery().data;

  const { selectMutation } = useCategoryMutations();

  const [categoryIdForUpdate, setCategoryIdForUpdate] = useState<number | null>(
    null
  );

  const { name, id } = selectedCategory || { name: "", id: -1 };

  return (
    <>
      <CategoryPopup
        isOpened={!!categoryIdForUpdate}
        onClose={() => setCategoryIdForUpdate(null)}
        categoryId={categoryIdForUpdate}
      />
      <Select
        value={{
          label: name,
          id,
        }}
        onSelect={(item: Option) => {
          selectMutation.mutate({ categoryId: item.id });
        }}
        renderOption={(label, id) => {
          return (
            <span className={"flex w-full items-center justify-between"}>
              <span className={"mr-2"}>{label}</span>
              <button
                className={"opacity-50 hover:opacity-100"}
                onClick={(e) => {
                  e.stopPropagation();
                  setCategoryIdForUpdate(id);
                }}
              >
                <Image
                  src={"/img/edit.svg"}
                  alt={"edit fragment svg"}
                  width={20}
                  height={20}
                />
              </button>
            </span>
          );
        }}
        options={
          categories?.map((el: Category) => ({
            label: el.name,
            id: el.id,
          })) || []
        }
      />
    </>
  );
};
