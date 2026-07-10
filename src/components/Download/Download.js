import googlePlay from '../../assets/google-play.png';
import appStore from '../../assets/app-store.png';
import './Download.css';

export default function Download(){
    return(
        <div className='download-section'>
            <h2>Download Now</h2>
            <div className='download-way'>
                <a href='https://play.google.com/store/apps'><img src={googlePlay} alt='Google-Play'/></a>
                <a href='https://www.apple.com/app-store/'><img src={appStore} alt='App-Store'/></a>
            </div>
        </div>
    );
};