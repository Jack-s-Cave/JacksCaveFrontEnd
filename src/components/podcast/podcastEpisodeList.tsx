import PodcastCard from 'components/podcast/podcastCard';
import { useAllPodcastEpisodes } from 'hooks/usePodcast';

const PodcastEpisodesList = () => {
  const { episodes, loading, error } = useAllPodcastEpisodes()
  if (loading) return <div></div>
  if (error) return <div>error</div>
  return (
    <div className="episodes-grid">
      {episodes.map(episode => <PodcastCard key={episode.id} podcastEpisode={episode} />)}
    </div>
  )
}

export default PodcastEpisodesList
