import './App.css'
import { useState, useEffect, useRef } from "react"
import { Button, Input } from "antd"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import MovieList from "./components/MovieList"
import MovieForm from "./components/MovieForm"
import MovieDetail from "./components/MovieDetail"
import MovieDelete from "./components/MovieDelete"
import { getMovies, createMovie, updateMovie, deleteMovie, API_URL } from "./api/movieapi"

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [detailMovie, setDetailMovie] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [activeHero, setActiveHero] = useState(0);
    const swiperRef = useRef(null);

    function fetchmovies() {
        setLoading(true);
        setError("");
        if (API_URL === undefined || API_URL === "") {
            setError("API URL is missing.");
            setLoading(false);
            return;
        }
        getMovies()
            .then(function (data) {
                setMovies(data);
                setLoading(false);
            })
            .catch(function () {
                setError("Failed to load movies.");
                setLoading(false);
            });
    }

    useEffect(function () {
        fetchmovies();
    }, []);

    useEffect(function () {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.2 });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        lenis.on("scroll", ScrollTrigger.update);
        return function () {
            lenis.destroy();
        };
    }, []);

    useEffect(function () {
        if (loading === true) {
            return;
        }
        gsap.fromTo(".header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
        gsap.fromTo(".hero", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
        const cards = gsap.utils.toArray(".movie");
        cards.forEach(function (card, index) {
            gsap.fromTo(card, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: (index % 4) * 0.08, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 92%" } });
        });
        return function () {
            ScrollTrigger.getAll().forEach(function (trigger) {
                trigger.kill();
            });
        };
    }, [loading, movies.length]);

    function handleaddclick() {
        setEditingMovie(null);
        setShowForm(true);
    }

    function handleeditclick(movie) {
        setEditingMovie(movie);
        setShowForm(true);
    }

    function handleviewclick(movie) {
        setDetailMovie(movie);
    }

    function handledeleteclick(movie) {
        setDeleteTarget(movie);
    }

    function handlecloseform() {
        setShowForm(false);
        setEditingMovie(null);
    }

    function handleformsubmit(formData) {
        const dataToSave = {
            title: formData.title,
            director: formData.director,
            genre: formData.genre,
            release_year: Number(formData.release_year),
            rating: Number(formData.rating),
            description: formData.description,
            image: formData.image
        };

        if (editingMovie === null) {
            createMovie(dataToSave)
                .then(function (newMovie) {
                    const updatedMovies = [...movies, newMovie];
                    setMovies(updatedMovies);
                    handlecloseform();
                })
                .catch(function () {
                    setError("Failed to add movie.");
                });
        } else {
            updateMovie(editingMovie.id, dataToSave)
                .then(function (updatedMovie) {
                    const updatedMovies = movies.map(function (movie) {
                        if (movie.id === updatedMovie.id) {
                            return updatedMovie;
                        } else {
                            return movie;
                        }
                    });
                    setMovies(updatedMovies);
                    handlecloseform();
                })
                .catch(function () {
                    setError("Failed to update movie.");
                });
        }
    }

    function handleconfirmdelete() {
        deleteMovie(deleteTarget.id)
            .then(function () {
                const remainingMovies = movies.filter(function (movie) {
                    return movie.id !== deleteTarget.id;
                });
                setMovies(remainingMovies);
                setDeleteTarget(null);
            })
            .catch(function () {
                setError("Failed to delete movie.");
            });
    }

    function handlecanceldelete() {
        setDeleteTarget(null);
    }

    function handleclosedetail() {
        setDetailMovie(null);
    }

    function handlesearchchange(event) {
        setSearch(event.target.value);
    }

    function handlegenrechange(event) {
        setGenreFilter(event.target.value);
    }

    function handlesearchbtn() {
        if (showSearch === true) {
            setShowSearch(false);
        } else {
            setShowSearch(true);
        }
    }

    function getherolist() {
        if (movies.length <= 5) {
            return movies;
        }
        return movies.slice(0, 5);
    }

    function handleheroview(movie) {
        setDetailMovie(movie);
    }

    function handleheroslidechange(swiper) {
        setActiveHero(swiper.realIndex);
    }

    function handleheroswiper(swiper) {
        swiperRef.current = swiper;
    }

    function handleheroprev() {
        if (swiperRef.current !== null) {
            swiperRef.current.slidePrev();
        }
    }

    function handleheronext() {
        if (swiperRef.current !== null) {
            swiperRef.current.slideNext();
        }
    }

    function handleherodot(index) {
        if (swiperRef.current !== null) {
            swiperRef.current.slideToLoop(index);
        }
    }

    function handlelogoclick() {
        window.location.reload();
    }

    function getfilteredmovies() {
        const searchText = search.toLowerCase();
        const result = movies.filter(function (movie) {
            const matchSearch = movie.title.toLowerCase().includes(searchText) || movie.director.toLowerCase().includes(searchText);
            const matchGenre = genreFilter === "" || movie.genre === genreFilter;
            if (matchSearch && matchGenre) {
                return true;
            } else {
                return false;
            }
        });
        return result;
    }

    const filteredMovies = getfilteredmovies();
    const heroList = getherolist();
    const activeMovie = heroList.length > 0 ? heroList[activeHero % heroList.length] : null;

    return (
        <div className="page">
            <header className="header">
                <div className="headertext">
                    <h1 className="sitetitle" onClick={handlelogoclick} style={{ cursor: "pointer" }}>WATCHIT</h1>
                </div>
                <div className="filters">
                    <button className="searchbtn" onClick={handlesearchbtn}><img src="/searchicon.svg" alt="Search" /></button>
                    <div className={showSearch ? "searchslide open" : "searchslide"}>
                        <Input className="search" placeholder="Search title or director" value={search} onChange={handlesearchchange} style={{ width: "20vw", background: "#1f1f1f", borderColor: "#333", color: "#fff", borderRadius: "2vw" }} />
                        <select className="genre" value={genreFilter} onChange={handlegenrechange} style={{ width: "15vw", background: "#1f1f1f", borderColor: "#333", color: "#fff", borderRadius: "2vw", padding: "0.5vw 1vw", borderWidth: "1px", borderStyle: "solid" }}>
                            <option value="">All genres</option>
                            <option value="Action">Action</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Romance">Romance</option>
                            <option value="Sports">Sports</option>
                            <option value="Comedy">Comedy</option>
                        </select>
                    </div>
                </div>
                <Button type="primary" className="btnadd" onClick={handleaddclick} style={{ background: "#e50914", border: "none" }}>Add a movie</Button>
            </header>

            {heroList.length > 0 && loading === false && error === "" && search === "" && genreFilter === "" ? (
                <div className="hero">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    onSwiper={handleheroswiper}
                    onSlideChange={handleheroslidechange}
                    className="heroswiper"
                >
                    {heroList.map(function (movie) {
                        return (
                            <SwiperSlide key={movie.id}>
                                <div className="heroslide">
                                    <img className="heroimg" src={movie.image} alt={movie.title} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                {activeMovie !== null ? (
                    <div key={activeMovie.id} className="heroinfo herofade">
                        <h2 className="herotitle">{activeMovie.title}</h2>
                        <p className="herometa">{activeMovie.genre} - {activeMovie.release_year}</p>
                        <div className="heroactions">
                            <button className="heroplay" onClick={function () { handleheroview(activeMovie); }}>View</button>
                        </div>
                    </div>
                ) : null}
                <button className="heroarrow heroarrowleft" onClick={handleheroprev}><img src="/chevleft.svg" alt="Previous" /></button>
                <button className="heroarrow heroarrowright" onClick={handleheronext}><img src="/chevright.svg" alt="Next" /></button>
                <div className="herodots">
                    {heroList.map(function (movie, index) {
                        return (
                            <button key={movie.id} className={index === (activeHero % heroList.length) ? "herodot herodotactive" : "herodot"} onClick={function () { handleherodot(index); }} />
                        );
                    })}
                </div>
                </div>
            ) : null}

            <h1 className="movielisttitle">Movie List</h1>

            {loading ? (<p className="message">Loading Movies</p>) : null}

            {error !== "" ? (<p className="message">{error}</p>) : null}

            {loading === false && error === "" && filteredMovies.length === 0 ? (
                <p className="message">No movies found.</p>
            ) : null}

            {loading === false && error === "" ? (
                <MovieList
                    movies={filteredMovies}
                    onView={handleviewclick}
                    onEdit={handleeditclick}
                    onDelete={handledeleteclick}
                />
            ) : null}

            <MovieForm open={showForm} initialMovie={editingMovie} onSubmit={handleformsubmit} onClose={handlecloseform} />

            {detailMovie !== null ? (
                <MovieDetail open={true} movie={detailMovie} onClose={handleclosedetail} />
            ) : null}

            {deleteTarget !== null ? (
                <MovieDelete open={true} movie={deleteTarget} onCancel={handlecanceldelete} onConfirm={handleconfirmdelete} />
            ) : null}
        </div>
    );
}

export default App
