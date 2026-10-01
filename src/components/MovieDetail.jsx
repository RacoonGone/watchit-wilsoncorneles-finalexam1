import { Modal, Button } from "antd"

export default function MovieDetail({ open, movie, onClose }) {
    function handleimageerror(event) {
        event.target.src = "https://via.placeholder.com/300x400?text=No+Image";
    }

    if (movie === null || movie === undefined) {
        return null;
    }

    return (
        <Modal open={open} onCancel={onClose} footer={null} destroyOnHidden={true} centered={true} width="45vw" scrollLock={false} title={null} className="netflixmodal" closeIcon={<img src="/close.svg" alt="Close" className="modalclose" />} styles={{ mask: { background: "rgba(0, 0, 0, 0.35)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }, container: { background: "#141414", borderRadius: "0.8vw", padding: "0", border: "1px solid #2a2a2a", overflow: "hidden" }, header: { background: "#141414", padding: "0", borderBottom: "none", marginBottom: "0" }, body: { background: "#141414", color: "#e5e5e5", padding: "0" }, footer: { background: "#141414", borderTop: "none" } }}>
            <div style={{ background: "#141414", borderRadius: "0.8vw", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "100%", height: "22vw", overflow: "hidden" }}>
                <img src={movie.image} alt={movie.title} onError={handleimageerror} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", top: "0", background: "linear-gradient(transparent 40%, rgba(20, 20, 20, 0.95) 100%)" }} />
                <div style={{ position: "absolute", left: "2vw", bottom: "1.5vw", right: "2vw" }}>
                    <h2 style={{ color: "#fff", fontSize: "2.2vw", margin: "0 0 0.5vw 0" }}>{movie.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                        <span style={{ color: "#FFD700", fontSize: "1.1vw", display: "flex", alignItems: "center", gap: "0.3vw" }}><img className="staricon" src="/star.svg" alt="Star" style={{ width: "1vw", height: "1vw" }} /> {movie.rating}</span>
                        <span style={{ color: "#b3b3b3", fontSize: "1vw" }}>{movie.release_year}</span>
                        <span style={{ background: "#e50914", color: "#fff", fontSize: "0.9vw", padding: "0.2vw 0.7vw", borderRadius: "0.3vw" }}>{movie.genre}</span>
                    </div>
                </div>
            </div>
            <div style={{ padding: "1.5vw 2vw 2vw 2vw" }}>
                <p style={{ color: "#b3b3b3", fontSize: "1.1vw", margin: "0 0 0.8vw 0" }}>Directed by {movie.director}</p>
                <p style={{ color: "#e5e5e5", fontSize: "1.1vw", lineHeight: "1.6", margin: "0" }}>{movie.description}</p>
                <div className="formbuttons" style={{ background: "#141414", marginTop: "1.5vw" }}>
                    <Button onClick={onClose} style={{ background: "#e50914", color: "#fff", border: "none", padding: "0.5vw 2vw", height: "auto", fontSize: "1vw", borderRadius: "0.4vw" }}>Close</Button>
                </div>
            </div>
            </div>
        </Modal>
    );
}
