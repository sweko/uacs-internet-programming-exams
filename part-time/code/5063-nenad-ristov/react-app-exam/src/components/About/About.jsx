import './About.css'

const About = () =>{

    return(
        <>
        <h1>About</h1>
        <p>Name:</p>
        <h3>Nenad Ristov</h3>
        <p>Id:</p>
        <h3>5063</h3>
        <p>Id:</p>
        <h3>{new Date().getFullYear()}</h3>
        <p>Link to github:</p>
        <a href="https://github.com/nenadristov/uacs-internet-programming-exams/tree/part-time/part-time/code/5063-nenad-ristov"> Link</a><br />
        <p>Other Informations</p>
        <h4>Would have made it to look nicer design wise if I had  more time.</h4>
        </>
    )
}

export default About