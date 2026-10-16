import { useEffect, useState } from 'react'

export default function Typewriter({ words = [] }) {
  const [w, setW] = useState(0)
  const [c, setC] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const word = words[w]
    const t = setTimeout(
      () => {
        if (!del && c === word.length) return setDel(true)
        if (del && c === 0) { setDel(false); return setW((w + 1) % words.length) }
        setC(c + (del ? -1 : 1))
      },
      !del && c === word.length ? 1400 : del ? 40 : 85,
    )
    return () => clearTimeout(t)
  }, [c, del, w, words])

  return <span>{(words[w] || '').slice(0, c)}<i className="caret">&nbsp;</i></span>
}
