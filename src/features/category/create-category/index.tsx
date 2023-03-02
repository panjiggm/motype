import Image from "next/image";
import { useCallback, useState } from "react";
import { useIsAuthed } from "~/features/user/lib";
import { CategoryPopup } from "../category-popup";

export const CreateCategory = () => {
  const isAuthed = useIsAuthed();

  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  const onClose = useCallback(() => {
    setIsOpenedPopup(false);
  }, []);

  if (!isAuthed) return null;

  return (
    <>
      <div
        onClick={() => setIsOpenedPopup(true)}
        className="ml-2 flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded border border-gray-300 bg-white hover:border-gray-400"
      >
        <Image src={"/img/add.svg"} height={20} width={20} alt="add" />
      </div>
      <CategoryPopup
        isOpened={isOpenedPopup}
        onClose={onClose}
        categoryId={null}
      />
    </>
  );
};
