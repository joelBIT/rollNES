import { useState, useEffect, useRef, useCallback, type ReactElement } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import "./GameCarousel.css";

const PHOTOS = [
    { id: 1, src: "/zelda2.png", caption: "Zelda 2: The Adventure of Link", meta: "Parapa Palace · 7:40 AM" },
    { id: 2, src: "/mario3.png", caption: "Super Mario Bros. 3", meta: "World 3: Water Land · 6:12 AM" },
    { id: 3, src: "/megaman2.png", caption: "Mega man 2", meta: "Wood Man's Stage · 8:55 AM" },
    { id: 4, src: "/battletoads.png", caption: "Battletoads", meta: "Ragnarok's Canyon · 10:20 AM" },
    { id: 5, src: "/ducktales.webp", caption: "Ducktales", meta: "The Amazon · 12:05 PM" },
    { id: 6, src: "/mariobros.webp", caption: "Mario Bros.", meta: "World 8-4 · 1:30 PM" },
    { id: 7, src: "/shadowgate.jpg", caption: "Shadowgate", meta: "Outside Castle Shadowgate · 5:45 PM" },
    { id: 8, src: "/castlevania2.jpg", caption: "Castlevania 2: Simon's Quest", meta: "Berkeley Mansion · 7:58 PM" }
];

export function GameCarousel(): ReactElement {
    const [index, setIndex] = useState<number>(0);
    const [marker, setMarker] = useState<{transform: string, width: number}>({ transform: "translateX(0px)", width: 0 });
    const thumbRefs = useRef<HTMLButtonElement[]>([]);
    const railRef = useRef<HTMLDivElement>(null);

    const go = useCallback((i: number) => {
        setIndex(((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length);
    }, []);

    useEffect(() => {
        const el = thumbRefs.current[index];
        const rail = railRef.current;
        if (el && rail) {
            const railRect = rail.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            setMarker({
                transform: `translateX(${elRect.left - railRect.left + rail.scrollLeft}px)`,
                width: elRect.width
            });
        }
    }, [index]);

    const photo = PHOTOS[index];

    return (
        <div className="gameCarousel">
            <div className="viewer">
                <img
                    key={photo.id}
                    src={photo.src}
                    alt={photo.caption}
                    className="main-image"
                />
                <div className="gradientBottom" />

                <button
                    aria-label="Previous photo"
                    onClick={() => go(index - 1)}
                    className="nav-button"
                    style={{ left: 16 }}
                >
                    <ChevronLeft size={20} color="#EFE8D8" />
                </button>

                <button
                    aria-label="Next photo"
                    onClick={() => go(index + 1)}
                    className="nav-button"
                    style={{ right: 16 }}
                >
                    <ChevronRight size={20} color="#EFE8D8" />
                </button>

                <div className="captionBar">
                    <span className="counter">
                        {String(index + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
                    </span>
                    
                    <span className="captionText">{photo.caption}</span>
                    <span className="meta">
                        <MapPin size={12} style={{ marginRight: 4, verticalAlign: -2 }} />
                        {photo.meta}
                    </span>
                </div>
            </div>

            <section className="railWrapper">
                <Sprockets />

                <div ref={railRef} className="rail">
                    <div className="marker" style={{...marker}} />

                    {
                        PHOTOS.map((photo, i) => (
                            <button
                                key={photo.id}
                                ref={(el: any) => (thumbRefs.current[i] = el)}
                                onClick={() => go(i)}
                                aria-label={`Show photo: ${photo.caption}`}
                                className={`thumb${i === index ? " active" : ""}`}
                                style={styles.thumb}
                            >
                                <img src={photo.src} alt={photo.caption} className="thumbImage" />
                            </button>
                        ))
                    }
                </div>

                <Sprockets />
            </section>
        </div>
    );
}

function Sprockets() {
    return (
        <div className="sprocketRow">
            {
                Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="sprocketHole" />
                ))
            }
        </div>
    );
}

const styles = {
    thumb: {
        flex: "0 0 auto",
        width: 84,
        height: 56,
        padding: 0,
        border: "none",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        background: "none"
    }
};
