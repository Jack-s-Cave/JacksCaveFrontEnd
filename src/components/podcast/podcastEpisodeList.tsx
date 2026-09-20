import PodcastCard from 'components/podcast/podcastCard';
import { PodcastEpisode } from 'types/podcast';

type PodcastEpisodesListProps = {
  episodes: PodcastEpisode[]
}

const PodcastEpisodesList = ({ episodes }: PodcastEpisodesListProps) => {
  return (
    <div className="episodes-grid">
      {episodes.map(episode => <PodcastCard key={episode.id} podcastEpisode={episode} />)}
    </div>
  )
}

export default PodcastEpisodesList
