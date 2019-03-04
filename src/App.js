import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/SignIn/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';



const particlesOptions = {
    particles: {
            color: { value: "#fafcff"},
            number: { value: 125, density: {enable: true, value_area: 800 }},
            line_linked: {
                enable: true,
                distance: 125,
                color: "#4d219a",
                width: 2.5
            }}
};

const initialState = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
        id: '125',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
    }
};


class App extends Component {
     constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    };

/*    componentDidMount() {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(console.log) // SHORT FOR data => console.log(data)
    }*/

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };

    displayFaceBox = (box) => {
        this.setState({box: box});
        console.log(box);
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});
               fetch('https://thawing-shore-93064.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response) {
                        fetch('https://thawing-shore-93064.herokuapp.com/:3000/image', {
                            method: 'put',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count}))
                        })
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({initialState})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };


    render() {
       const {isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ? <div>< Logo/>
                        < Rank name={this.state.user.name} entries={this.state.user.entries} />
                        < ImageLinkForm onInputChange={this.onInputChange}
                                        onButtonSubmit={this.onPictureSubmit}/>
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    : (
                        route === 'signin'  || route === 'signout' ?
                            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    :  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}
// d75ca3a49d1244e8a135938f5ecf47b4 API KEY
export default App;
