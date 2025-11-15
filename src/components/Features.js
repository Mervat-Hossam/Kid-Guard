import feature1 from '../assets/feature1.png';
import feature2 from '../assets/feature2.png';
import feature3 from '../assets/feature3.png';
import feature4 from '../assets/feature4.png';
import './Features.css';

export default function Features(){
     const featuresList = [
    {
        img: feature1,
        alt: "feature1",
        title: "Activity Monitoring",
        description: "Live GPS Tracking, Online/Offline Status,Heart Rate & Battery Level.",
      
    },
    {
        img: feature2,
        alt: "feature2",
        title: "Instant Notifications",
        description: "Safe Zone Breaches, Abnormal Voice Detection & Sos Alerts.",
    },
    {
        img: feature3,
        alt: "feature3",
        title: "User Management",
        description: "Add New Children, Mange Smartwatches, Set Guardian Permissions.",
    },
    {
        img: feature4,
        alt: "feature4",
        title: "App & Website Filters",
        description: "Manage App Access, Filters Websites, Set Screen Time Limits"
    }
  ];
    return(
        <div className='features'>
            <h2>Key Features</h2>
            <div className="cards-container">
                {featuresList.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        img = {feature.img}
                        alt={feature.alt}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    );
}

function FeatureCard({ img, alt, title, description }) {
  return (
      <div className="feature-card">
        <img src={img} alt={alt}/>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
  );
}