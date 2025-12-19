import hero1 from '../../assets/hero1.jpg'
import hero2 from '../../assets/hero2.jpg'
import './Hero.css';

export default function Hero(){
    return(
        <div className="hero">
            <div className='left-img'>
                <img src = {hero1} alt='hero1' />
            </div>
            
            <div className='hero-content'>
                <h2>Protecting What Matters Most.AI-Powered Safety For Your Child</h2>
                <p>Real-time alerts, smart monitoring and peace of mind for parents in the digital age.</p>
                <div className='btns'>
                    <button className="learn">Learn More</button>
                    <button className="download">Download App</button>
                </div>
            </div>
            <div className='right-img'>
                <img src = {hero2} alt='hero2' />
            </div>
        </div>
    );
}