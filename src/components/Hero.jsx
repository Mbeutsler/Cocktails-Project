import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import {useRef} from "react";
import {useMediaQuery} from "react-responsive";

const Hero = () => {
    const videoRef = useRef();
    const isMobile = useMediaQuery({maxWidth: 767});

    useGSAP(() => {
        const heroSplit = new SplitText(".title", {type: "chars, words"});
        const paragraphSplit = new SplitText(".subtitle", {type: "lines"});

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            stagger: 0.06,
            duration: 1.6,
            ease: "expo.out",
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            stagger: 0.06,
            duration: 1.8,
            delay: 1,
            ease: "expo.out",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
            .to(".left-leaf", {y: -200}, 0)
            .to(".right-leaf", {y: 200}, 0)

        const startVidValue = isMobile ? "top 50%" : "center 60%";
        const endVidValue = isMobile ? "120% top" : "bottom top";

        const videoTl =gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startVidValue,
                end: endVidValue,
                scrub: true,
                pin: true,
            }
        })

        videoRef.current.onloadedmetadata = () => {
            videoTl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }
    }, [])
    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">STORIES</h1>

                <img
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    className="left-leaf"
                />

                <img
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="layout">
                            <p>Cool, Crisp, Classic</p>
                            <p className="subtitle">
                                Sip the Adventures <br/> of Summer
                            </p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, creative flair, and
                                timeless recipes — designed to delight your sense.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video">
                <video
                    ref={videoRef}
                    src="/videos/output.mp4"
                    muted
                    playsInline /* hides UI of videos, play/pause, trackbar, etc */
                    preload="auto" /* opens immediately when user enters page */
                />
            </div>
        </>
    )
}
export default Hero;
