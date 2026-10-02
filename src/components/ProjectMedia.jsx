export default function ProjectMedia({ project, detail = false }) {
  if (project.youtubeId) {
    const start = project.youtubeStart || 0;
    return (
      <div className={`project-media youtube-media ${detail ? 'is-detail' : ''}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?start=${start}&rel=0`}
          title={`${project.title} video demo`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (project.video) {
    return (
      <div className={`project-media local-video ${detail ? 'is-detail' : ''}`}>
        <video controls preload="metadata" playsInline src={project.video} aria-label={`${project.title} video demo`}>
          Your browser does not support this video.
        </video>
      </div>
    );
  }

  if (project.image) {
    return <div className={`project-media ${detail ? 'is-detail' : ''}`}><img src={project.image} alt={project.imageAlt || ''} loading="lazy" /></div>;
  }

  return <div className="project-media media-offline" role="img" aria-label="Project media coming soon"><span>NO SIGNAL</span><small>MEDIA PENDING</small></div>;
}
