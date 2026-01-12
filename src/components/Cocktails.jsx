import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {cocktailsList, mocktailsList} from "../../constants/index.js";

const Cocktails = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails",
                start: "top 30%",
                end: "bottom 80%",
                scrub: true
            }
        })

        parallaxTimeline
            .from("#c-left-leaf", {
                x: -100, y: 100
            })
            .from("#c-right-leaf", {
                x: 100, y: 100
            })
    });

    return (
        <section id="cocktails" className="noisy">
            <img src="/images/cocktail-left-leaf.png" alt="left-leaf" id="c-left-leaf"/>
            <img src="/images/cocktail-right-leaf.png" alt="right-leaf" id="c-right-leaf"/>

            <div className="list">
                <div className="favorite">
                    <h2>Favorite Anecdotes:</h2>

                    <ul>
                        {cocktailsList.map(({name, country, detail, price}) => (
                            <li key={name}>
                                <div className="md:me-28">
                                    <h3>{name}</h3>
                                    <p>{country} | {detail}</p>
                                </div>
                                <span>— {price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="popular">
                    <h2>Popular MockTales:</h2>

                    <ul>
                        {mocktailsList.map(({name, country, detail, price}) => (
                            <li key={name}>
                                <div className="me-28">
                                    <h3>{name}</h3>
                                    <p>{country} | {detail}</p>
                                </div>
                                <span>— {price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default Cocktails;
