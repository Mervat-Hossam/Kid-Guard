import work1 from '../assets/work1.png';
import work2 from '../assets/work2.png';
import work3 from '../assets/work3.png';
import arrow from '../assets/arrow.png'
import './Work.css';

export default function Work(){
     const workingList = [
    {
        img: work1,
        alt: "work1",
        title: "Kid's Smartwatch App:",
        description: "Automatically analyzes Surroundings",
      
    },
    {
        img: work2,
        alt: "work2",
        title: "AI Cloud Analysis:",
        description: "Detects Threats & Analyzes Data",
    },
    {
        img: work3,
        alt: "work3",
        title: "Guardian's Smartphone App:",
        description: "Receives Alerts & Reports",
    }
];
    return(
        <div className='how-work'>
            <h2>How It Works</h2>    
                <div className="cards-container">
                    {workingList.map((work, index) => (
                        <div key={index} className="work-wrapper">
                            <WorkingContent
                                key={index}
                                img = {work.img}
                                alt={work.alt}
                                title={work.title}
                                description={work.description}
                            />
                            {index !== workingList.length - 1 && (
                            <div className='arrow'>
                                <img src={arrow} alt='next-step'/>
                            </div>
                        )}
                        </div>
                    ))}
                </div>
        </div>
    );
}

function WorkingContent({ img, alt, title, description }){
    return(
        <div className="work-content">
            <img src={img} alt={alt}/>
            <div className='content'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
      </div>
    );
}