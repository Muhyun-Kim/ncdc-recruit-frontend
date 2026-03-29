import Image from "next/image";

type ButtonVariant = "primary" | "secondary" | "normal";

function Button({
  onClick,
  imgSrc,
  buttonName,
  variant = "primary",
  disabled = false,
}: {
  onClick: () => void;
  imgSrc: string;
  buttonName: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-light-blue text-white hover:bg-light-blue/80 active:bg-light-blue/60 disabled:bg-black-30/50 disabled:text-[#999999]",
    secondary:
      "bg-white border border-light-blue text-light-blue hover:bg-[#CCCCCC] active:bg-[#B3B3B3] disabled:text-[#4CB3F8]",
    normal:
      "bg-black-30 text-white hover:bg-black-30/80 active:bg-black-30/60 disabled:bg-black-30/50 disabled:text-[#999999]",
  };

  return (
    <button
      className={`h-[40px] w-[90px] px-[10px] rounded-[4px] flex flex-col items-center justify-center ${variantStyles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Image src={imgSrc} alt={buttonName} width={24} height={24} />
      <span className="text-[12px]">{buttonName}</span>
    </button>
  );
}

export function EditButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      imgSrc="/icon/edit.svg"
      buttonName="Edit"
      variant="primary"
      disabled={disabled}
    />
  );
}

export function NewPageButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      imgSrc="/icon/+.svg"
      buttonName="New page"
      variant="secondary"
      disabled={disabled}
    />
  );
}

export function DoneButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      imgSrc="/icon/done.svg"
      buttonName="Done"
      variant="primary"
      disabled={disabled}
    />
  );
}

export function CancelButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      imgSrc="/icon/cancel.svg"
      buttonName="Cancel"
      variant="normal"
      disabled={disabled}
    />
  );
}

export function DeleteButton({
  onClick,
  disabled = false,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="h-[40px] min-w-[40px] flex items-center justify-center hover:opacity-70 active:opacity-50 disabled:opacity-30"
      onClick={onClick}
      disabled={disabled}
    >
      <Image src="/icon/delete.svg" alt="Delete" width={24} height={24} />
    </button>
  );
}
