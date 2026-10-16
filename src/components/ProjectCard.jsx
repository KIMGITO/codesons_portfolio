import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import ImageBox from './ImageBox'
import Reveal from './Reveal'

export default function ProjectCard({ project, variant = 'standard', delay = 0, className = '' }) {
  const {
    slug = '',
    title = '',
    category = '',
    summary = '',
    tags = [],
    image,
    gradient,
    demoUrl,
  } = project || {}

  if (variant === 'overlay') {
    return (
      <Reveal delay={delay} className={`h-full ${className}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full"
        >
          <Link
            to={`/work/${slug}`}
            className="group relative flex h-80 md:h-96 w-full flex-col justify-end overflow-hidden rounded-3xl border border-tx/10 bg-bg2 shadow-xl transition-all duration-500 hover:border-a2/60 hover:shadow-2xl hover:shadow-a2/20"
          >
            <ImageBox
              src={image}
              alt={title}
              gradient={gradient}
              className="absolute inset-0 h-full w-full"
              imgClass="transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-300" />
            <div className="relative z-10 flex flex-col p-6 sm:p-8">
              {category && (
                <p className="text-xs font-semibold uppercase tracking-wider text-a3">{category}</p>
              )}
              <h3 className="mt-1 text-2xl font-bold text-white transition-colors group-hover:text-a3">
                {title}
              </h3>
              {summary && (
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">{summary}</p>
              )}
              {tags && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-a3">
                <span>View case</span>
                <FaArrowRight className="text-a2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </motion.div>
      </Reveal>
    )
  }

  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass glass-hover group flex h-full flex-col overflow-hidden"
      >
        <Link to={`/work/${slug}`} className="block overflow-hidden">
          <ImageBox
            src={image}
            alt={title}
            gradient={gradient}
            className="h-52 w-full"
            imgClass="transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        <div className="flex flex-1 flex-col p-6">
          {category && <p className="text-xs font-semibold text-a3">{category}</p>}
          <Link to={`/work/${slug}`}>
            <h3 className="mt-1 text-xl font-bold text-tx transition-colors group-hover:text-a1">
              {title}
            </h3>
          </Link>
          {summary && <p className="mt-2 flex-1 text-sm text-mu">{summary}</p>}
          {tags && tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-gradient-to-r from-a1 to-a2 px-3 py-1 text-xs font-medium text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-5 flex items-center justify-between pt-2">
            <Link
              to={`/work/${slug}`}
              className="gt inline-flex items-center gap-2 font-semibold text-sm transition-transform duration-300 group-hover:translate-x-1"
            >
              <span>View case</span>
              <FaArrowRight className="text-a2" />
            </Link>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}
