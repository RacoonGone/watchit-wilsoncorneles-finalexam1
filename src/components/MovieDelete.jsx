import { Modal } from "antd"

export default function MovieDelete({ open, movie, onCancel, onConfirm }) {
    if (movie === null || movie === undefined) {
        return null;
    }

    return (
        <Modal open={open} onCancel={onCancel} footer={null} destroyOnHidden={true} centered={true} width="30vw" scrollLock={false} title={null} closable={true} className="netflixmodal" closeIcon={<img src="/close.svg" alt="Close" className="modalclose" />} styles={{ mask: { background: "rgba(0, 0, 0, 0.35)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }, container: { background: "#141414", borderRadius: "0.8vw", padding: "0", border: "1px solid #2a2a2a" }, header: { background: "#141414", padding: "0", borderBottom: "none" }, body: { background: "#141414", color: "#e5e5e5", padding: "2.5vw 2vw", textAlign: "center" }, footer: { background: "#141414", borderTop: "none" } }}>
            <div style={{ background: "#141414", borderRadius: "0.8vw", textAlign: "center" }}>
            <img src="/alert.svg" alt="Warning" style={{ width: "3.5vw", height: "3.5vw", margin: "0 auto 1vw auto", display: "block" }} />
            <h2 style={{ color: "#fff", fontSize: "1.6vw", margin: "0 0 0.5vw 0" }}>Delete movie?</h2>
            <p style={{ color: "#e50914", fontSize: "1.2vw", margin: "0 0 0.5vw 0" }}>{movie.title}</p>
            <p style={{ color: "#b3b3b3", fontSize: "1vw", margin: "0 0 1.5vw 0" }}>This will permanently remove it from your collection.</p>
            <div style={{ display: "flex", gap: "1vw" }}>
                <button onClick={onCancel} style={{ flex: "1", background: "transparent", color: "#fff", border: "1px solid #555", borderRadius: "0.4vw", padding: "0.6vw 0", fontSize: "1vw", cursor: "pointer" }}>Cancel</button>
                <button onClick={onConfirm} style={{ flex: "1", background: "#e50914", color: "#fff", border: "none", borderRadius: "0.4vw", padding: "0.6vw 0", fontSize: "1vw", cursor: "pointer" }}>Delete</button>
            </div>
            </div>
        </Modal>
    );
}
