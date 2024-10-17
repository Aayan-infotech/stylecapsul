import React from 'react'
import Avatar from '@mui/material/Avatar';

const Explore = () => {

    const posts = [
        {
            id: 1,
            userName: "John Doe",
            postDate: "October 11",
            avatarUrl: "https://www.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg",
            postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos ipsum alias optio ut excepturi facilis cumque numquam corporis doloribus!",
            hashtags: "#hashtag",
            cardContent: [
                {
                    title: "Card title 1",
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                    imageUrl: "https://via.placeholder.com/150"
                },
                {
                    title: "Card title 2",
                    text: "Another example of card content.",
                    imageUrl: "https://via.placeholder.com/150"
                },
            ],
            likes: 177,
            comments: 42,
            shares: 42,
        },
        // You can add more posts here
    ];
    return (
        <div className="container my-4">
            <div className="container w-75">
                <div className="row g-2">
                    <div className="col-12">
                        <div className="p-3 border-1 bg-secondary">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} className='me-3' src="https://www.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg" />
                                    <div className='text-white'>
                                        <h5 style={{ lineHeight: '1.2' }}>User Name</h5>
                                        <h6 style={{ fontSize: "13px" }}>October 11 • <i className="fa-solid fa-earth-americas"></i></h6>
                                    </div>
                                </div>
                                <div><i className="fa-solid fa-ellipsis-vertical fs-4 text-white"></i></div>
                            </div>
                            <div className="text-white mt-2">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos ipsum alias optio ut excepturi facilis cumque numquam corporis doloribus!</p>
                                <a href="#" className="text-white text-decoration-none">#hashtag</a>
                            </div>

                            <div className='d-flex mt-3'>
                                <div className="card me-3" style={{ width: "18rem" }}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                                <div className="card me-3" style={{ width: "18rem" }}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className='d-flex align-items-center text-white'>
                                        <h6 className='me-3'><i class="fa-solid fa-thumbs-up"></i></h6>
                                        <h6>177</h6>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center text-white'>
                                    <h6 className='me-3'>42 Comments</h6>
                                    <h6>42 Shares</h6>
                                </div>
                            </div>

                            <hr />
                            <div className="d-flex justify-content-evenly align-items-center">
                                <h5><i class="fa-regular fa-thumbs-up me-2"></i> Like</h5>
                                <h5><i class="fa-regular fa-comment me-2"></i> Comment</h5>
                                <h5><i class="fa-solid fa-share me-2"></i> Share</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="p-3 border-1 bg-secondary">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} className='me-3' src="https://www.stylecraze.com/wp-content/uploads/2013/06/Different-Beautiful-American-Girls.jpg" />
                                    <div className='text-white'>
                                        <h5 style={{ lineHeight: '1.2' }}>User Name</h5>
                                        <h6 style={{ fontSize: "13px" }}>October 11 • <i className="fa-solid fa-earth-americas"></i></h6>
                                    </div>
                                </div>
                                <div><i className="fa-solid fa-ellipsis-vertical fs-4 text-white"></i></div>
                            </div>
                            <div className="text-white mt-2">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos ipsum alias optio ut excepturi facilis cumque numquam corporis doloribus!</p>
                                <a href="#" className="text-white text-decoration-none">#hashtag</a>
                            </div>

                            <div className='d-flex mt-3'>
                                <div className="card me-3" style={{ width: "18rem" }}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                                <div className="card me-3" style={{ width: "18rem" }}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className='d-flex align-items-center text-white'>
                                        <h6 className='me-3'><i class="fa-solid fa-thumbs-up"></i></h6>
                                        <h6>177</h6>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center text-white'>
                                    <h6 className='me-3'>42 Comments</h6>
                                    <h6>42 Shares</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
