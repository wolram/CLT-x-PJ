interface MaterialSymbolProps {
  name: string
  className?: string
  style?: React.CSSProperties
}

export function MaterialSymbol({ name, className = '', style }: MaterialSymbolProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} data-icon={name} style={style}>
      {name}
    </span>
  )
}