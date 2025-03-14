import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { groupBy } from "lodash";
import LoadingComponents from "../../components/FeatureMovies/LoadingComponents";
import useFetch from "../../hooks/useFetch";
import Banner from "../../components/MediaDetail/Banner";
import ActorList from "../../components/MediaDetail/ActorList";
import InfomationMedia from "../../components/MediaDetail/InfomationMedia";
import RelatedMovieList from "../../components/MediaDetail/RelatedMovieList";



export const MovieDetail = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();


    const { data: movieInfo, isLoading } = useFetch({
        url: `/movie/${id}?append_to_response=release_dates,credits,videos`,
    })


    const { data: recommendationsResponse } = useFetch({
        url: `/movie/${id}/recommendations`,
    })
    const movieRelated = recommendationsResponse.results || [];



    if (isLoading) {
        return (
           <LoadingComponents/>
        );
    }

    const crews = (movieInfo.credits?.crew || [])
        .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
        .map((crew) => ({
            id: crew.id,
            job: crew.job,
            name: crew.name
        }));
    const groupedCrews = groupBy(crews, "job");
    console.log({ crews, groupedCrews });
    return (
        <div>
            <Banner mediaInfo={movieInfo} />
            <div className="flex bg-black text-gray-500 flex-col lg:flex-row gap-10 p-8">
                <div className="flex-[2]">
                    <ActorList actors={movieInfo.credits?.cast || []} />
                </div>
                <div className="flex-[1]">
                    <InfomationMedia information={movieInfo} />
                </div>

            </div>
            <div>
                <RelatedMovieList mediaList={movieRelated} />
            </div>
        </div>
    )
}
