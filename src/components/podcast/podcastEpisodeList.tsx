import PodcastCard from 'components/podcast/podcastCard';
import { useAllPodcastEpisodes } from 'hooks/usePodcast';
import ErrorMessage from 'components/common/errorMessage';
import Spinner from 'components/common/spinner';

const PodcastEpisodesList = () => {
  const { episodes, loading, error } = useAllPodcastEpisodes()
  if (loading) return <Spinner />
  if (error) return <ErrorMessage />
  return (
    <div className="episodes-grid">
      {episodes.map(episode => <PodcastCard key={episode.id} podcastEpisode={episode} />)}
    </div>
  )
}

export default PodcastEpisodesList
