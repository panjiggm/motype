import { useState } from "react"
import { Popover } from "~/ui-kit"

export const UserPopover: React.FC<{
  username: string,
  avatarUrl: string,
  popoverContent: React.ReactNode
}> = ({ username, avatarUrl, popoverContent }) => {
  const [reference, setReference] = useState<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="flex items-center cursor-pointer space-x-4"
        ref={setReference}
        onClick={() => setIsOpen(s => !s)}
      >
        <div className="text-lg">
          {username || "Unknown username"}
        </div>

        {/* TODO: is it okay to use this kind of image in nextjs app ? */}

        <img
          className="h-9 w-9 rounded-full bg-blue-200"
          alt="avatar"
          src={avatarUrl}
        />
      </div>
      <Popover
          reference={reference}
          isOpen={isOpen}
          placement='bottom'
          onClose={() => setIsOpen(false)}
        >
        {popoverContent}
      </Popover>
    </>
  )
}