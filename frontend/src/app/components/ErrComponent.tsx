interface ErrPros {
  msg: string;
}

export default function ErrComponent({ msg }: ErrPros) {
  return (
    <>
      <span className="text-red-500 ml-2">{msg}</span>
    </>
  )
}
