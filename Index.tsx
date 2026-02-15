import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/services/tmdb";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import MobileNav from "@/components/MobileNav";

const GenreRow = ({ title, genreId }: { title: string; genreId: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "genre", genreId],
    queryFn: () => tmdb.byGenre(genreId),
    staleTime: 600000,
  });
  return <MovieRow title={title} movies={data?.results ?? []} isLoading={isLoading} />;
};

const GENRE_ROWS = [
  { title: "Action Blockbusters", genreId: 28 },
  { title: "Comedy", genreId: 35 },
  { title: "Sci-Fi & Fantasy", genreId: 878 },
  { title: "Horror", genreId: 27 },
  { title: "Romance", genreId: 10749 },
];

const Index = () => {
  const trending = useQuery({ queryKey: ["movies", "popular"], queryFn: tmdb.popular, staleTime: 600000 });
  const topRated = useQuery({ queryKey: ["movies", "topRated"], queryFn: tmdb.topRated, staleTime: 600000 });
  const upcoming = useQuery({ queryKey: ["movies", "upcoming"], queryFn: tmdb.upcoming, staleTime: 600000 });
  const nowPlaying = useQuery({ queryKey: ["movies", "nowPlaying"], queryFn: tmdb.nowPlaying, staleTime: 600000 });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <main>
        <HeroBanner />

        <div className="-mt-24 relative z-10 space-y-2">
          <MovieRow title="Popular on Netflux" movies={trending.data?.results ?? []} isLoading={trending.isLoading} />
          <MovieRow title="Top Rated" movies={topRated.data?.results ?? []} isLoading={topRated.isLoading} />
          <MovieRow title="Now Playing" movies={nowPlaying.data?.results ?? []} isLoading={nowPlaying.isLoading} />
          <MovieRow title="Upcoming" movies={upcoming.data?.results ?? []} isLoading={upcoming.isLoading} />

          {GENRE_ROWS.map((row) => (
            <GenreRow key={row.genreId} title={row.title} genreId={row.genreId} />
          ))}
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Index;
