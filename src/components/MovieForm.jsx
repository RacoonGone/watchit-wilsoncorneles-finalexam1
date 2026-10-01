import { useEffect, useState } from "react"
import { Modal, Form, Input, Button } from "antd"

export default function MovieForm({ open, initialMovie, onSubmit, onClose }) {
    const [form] = Form.useForm();
    const [preview, setPreview] = useState("");
    const isEditing = initialMovie !== null && initialMovie !== undefined;

    useEffect(() => {
        if (open === true) {
            if (isEditing) {
                form.setFieldsValue({
                    title: initialMovie.title,
                    director: initialMovie.director,
                    genre: initialMovie.genre,
                    release_year: Number(initialMovie.release_year),
                    rating: Number(initialMovie.rating),
                    description: initialMovie.description,
                    image: initialMovie.image,
                });
                setPreview(initialMovie.image);
            } else {
                form.resetFields();
                setPreview("");
            }
        }
    }, [open, initialMovie, form, isEditing]);

    function handlefinish(values) {
        const formData = {
            title: values.title.trim(),
            director: values.director.trim(),
            genre: values.genre,
            release_year: Number(values.release_year),
            rating: Number(values.rating),
            description: values.description.trim(),
            image: values.image.trim()
        };
        onSubmit(formData);
    }

    function handleimagechange(event) {
        setPreview(event.target.value);
    }

    function handlecancel() {
        form.resetFields();
        setPreview("");
        onClose();
    }

    return (
        <Modal open={open} onCancel={handlecancel} footer={null} destroyOnHidden={true} centered={true} width="36vw" scrollLock={false} title={null} className="netflixmodal" closeIcon={<img src="/close.svg" alt="Close" className="modalclose" />} styles={{ mask: { background: "rgba(0, 0, 0, 0.35)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }, container: { background: "#141414", borderRadius: "0.8vw", padding: "0", border: "1px solid #2a2a2a" }, header: { background: "#141414", padding: "0", borderBottom: "none" }, body: { background: "#141414", color: "#e5e5e5", padding: "2vw" }, footer: { background: "#141414", borderTop: "none" } }}>
            <div style={{ background: "#141414", borderRadius: "0.8vw" }}>
            <h2 style={{ color: "#fff", fontSize: "1.6vw", margin: "0 0 0.3vw 0" }}>{isEditing ? "Edit movie" : "Add a movie"}</h2>
            <p style={{ color: "#808080", fontSize: "1vw", margin: "0 0 1.5vw 0" }}>Fill in the movie details below.</p>
            <Form form={form} layout="vertical" onFinish={handlefinish} style={{ background: "#141414" }} requiredMark={false}>
                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Title</span>} name="title" rules={[{ required: true, message: "Title is required" }]} style={{ background: "#141414", marginBottom: "1vw" }}>
                    <Input placeholder="Interstellar" style={{ background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw", padding: "0.5vw 1vw" }} />
                </Form.Item>

                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Director</span>} name="director" rules={[{ required: true, message: "Director is required" }]} style={{ background: "#141414", marginBottom: "1vw" }}>
                    <Input placeholder="Christopher Nolan" style={{ background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw", padding: "0.5vw 1vw" }} />
                </Form.Item>

                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Genre</span>} name="genre" rules={[{ required: true, message: "Genre is required" }]} style={{ background: "#141414", marginBottom: "1vw" }}>
                    <select style={{ width: "100%", background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw", padding: "0.5vw 1vw", borderWidth: "1px", borderStyle: "solid" }}>
                        <option value="">Select genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Sports">Sports</option>
                        <option value="Comedy">Comedy</option>
                    </select>
                </Form.Item>

                <div className="formrow">
                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Release Year</span>} name="release_year" rules={[{ required: true, message: "Release year is required" }]} style={{ background: "#141414", marginBottom: "1vw", flex: "1" }}>
                    <input type="number" placeholder="2014" min={1900} max={2030} style={{ width: "100%", background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw", padding: "0.5vw 1vw", borderWidth: "1px", borderStyle: "solid", boxSizing: "border-box" }} />
                </Form.Item>

                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Rating</span>} name="rating" rules={[{ required: true, message: "Rating is required" }]} style={{ background: "#141414", marginBottom: "1vw", flex: "1" }}>
                    <input type="number" placeholder="8.5" min={0} max={10} step={0.1} style={{ width: "100%", background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw", padding: "0.5vw 1vw", borderWidth: "1px", borderStyle: "solid", boxSizing: "border-box" }} />
                </Form.Item>
                </div>

                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Description</span>} name="description" rules={[{ required: true, message: "Description is required" }]} style={{ background: "#141414", marginBottom: "1vw" }}>
                    <Input.TextArea placeholder="Movie description" rows={3} style={{ background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw" }} />
                </Form.Item>

                <Form.Item label={<span style={{ color: "#b3b3b3", background: "#141414" }}>Image URL</span>} name="image" rules={[
                    { required: true, message: "Image URL is required" },
                    { type: "url", message: "Image URL must start with http" }
                ]} style={{ background: "#141414", marginBottom: "1vw" }}>
                    <Input placeholder="https://.." onChange={handleimagechange} style={{ background: "#1f1f1f", borderColor: "#444", color: "#fff", borderRadius: "0.4vw", padding: "0.5vw 1vw" }} />
                </Form.Item>

                {preview !== "" ? (
                    <div className="sheetimg" style={{ background: "#222", borderRadius: "0.6vw", padding: "1vw", marginBottom: "1vw" }}>
                        <img className="preview" src={preview} alt="Movie preview" style={{ maxHeight: "15vw" }} />
                    </div>
                ) : null}

                <div className="formbuttons" style={{ background: "#141414", marginTop: "1.5vw" }}>
                    <Button onClick={handlecancel} style={{ background: "transparent", color: "#fff", borderColor: "#555", flex: "1", height: "3vw", fontSize: "1vw", borderRadius: "0.4vw" }}>Cancel</Button>
                    <Button type="primary" htmlType="submit" style={{ background: "#e50914", border: "none", color: "#fff", flex: "2", height: "3vw", fontSize: "1vw", borderRadius: "0.4vw" }}>Save movie</Button>
                </div>
            </Form>
            </div>
        </Modal>
    );
}
