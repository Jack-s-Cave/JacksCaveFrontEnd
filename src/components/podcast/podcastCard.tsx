import { FaSpotify, FaYoutube } from "react-icons/fa";
import { PodcastEpisode } from "types/podcast";

type PodcastCardProps = {
  podcastEpisode: PodcastEpisode
};

const PodcastCard = ({ podcastEpisode }: PodcastCardProps) => {
  return (
    <div key={podcastEpisode.id} className="podcast-card">
      <div className="podcast-video">
        {podcastEpisode.embedId && (
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${podcastEpisode.embedId}`}
            title={podcastEpisode.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="podcast-info">
        <h3 className="podcast-title">{podcastEpisode.title}</h3>
        <p className="podcast-description">{podcastEpisode.description}</p>
        <div className="podcast-links">
          <div className="platform-links">
            {podcastEpisode.youtubeLink && (
              <a href={podcastEpisode.youtubeLink} target="_blank" rel="noopener noreferrer" className="platform-link youtube-link">
                <FaYoutube /> Youtube
              </a>
            )}
            {podcastEpisode.spotifyLink && (
              <a href={podcastEpisode.spotifyLink} target="_blank" rel="noopener noreferrer" className="platform-link spotify-link">
                <FaSpotify /> Spotify
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastCard
