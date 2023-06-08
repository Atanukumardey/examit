'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function UserProfile() {
	return (
		<div>
			<section className='vh-100' style={{ backgroundColor: '#5f59f7' }}>
				<div className='container py-5 h-100'>
					<div className='row d-flex justify-content-center align-items-center h-100'>
						<div className='col col-xl-10'>
							<div
								className='card mb-5'
								style={{ borderRadius: 15 }}
							>
								<div className='card-body p-4'>
									<h3 className='mb-3'>Program Title</h3>
									<p className='small mb-0'>
										<i className='far fa-star fa-lg' />
										{""}
										<span className='mx-2'>|</span> Created
										by
										<strong>MDBootstrap</strong> on 11 April
										, 2021
									</p>
									<hr className='my-4' />
									<div className='d-flex justify-content-start align-items-center'>
										<p className='mb-0 text-uppercase'>
											<i className='fas fa-cog me-2' />
											{""}
											<span className='text-muted small'>
												settings
											</span>
										</p>
										<p className='mb-0 text-uppercase'>
											<i className='fas fa-link ms-4 me-2' />
											{""}
											<span className='text-muted small'>
												program link
											</span>
										</p>
										<p className='mb-0 text-uppercase'>
											<i className='fas fa-ellipsis-h ms-4 me-2' />
											{""}
											<span className='text-muted small'>
												program link
											</span>
											<span className='ms-3 me-4'>|</span>
										</p>
										<a href='#!'>
											<img
												src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp'
												alt='avatar'
												className='img-fluid rounded-circle me-3'
												width={35}
											/>
										</a>
										<button
											type='button'
											className='btn btn-outline-dark btn-sm btn-floating'
										>
											<i className='fas fa-plus' />
										</button>
									</div>
								</div>
							</div>
							<div className='card' style={{ borderRadius: 15 }}>
								<div className='card-body p-4'>
									<h3 className='mb-3'>Company Culture</h3>
									<p className='small mb-0'>
										<i className='fas fa-star fa-lg text-warning' />
										{""}
										<span className='mx-2'>|</span>
										Public <span className='mx-2'>|</span>
										{""}
										Updated by <strong>MDBootstrap</strong>
										{""}
										on 11 April , 2021
									</p>
									<hr className='my-4' />
									<div className='d-flex justify-content-start align-items-center'>
										<p className='mb-0 text-uppercase'>
											<i className='fas fa-cog me-2' />
											{""}
											<span className='text-muted small'>
												settings
											</span>
										</p>
										<p className='mb-0 text-uppercase'>
											<i className='fas fa-link' />
                                            {/* <i className='fas fa-plus' /> */}
											{""}
											<span className='text-muted small'>
												program link
											</span>
										</p>
										<p className='mb-0 text-uppercase'>
											<i className='fas fa-ellipsis-h ms-4 me-2' />
											{""}
											<span className='text-muted small'>
												program link
											</span>
											<span className='ms-3 me-4'>|</span>
										</p>
										<a href='#!'>
											<img
												src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp'
												alt='avatar'
												className='img-fluid rounded-circle me-1'
												width={35}
											/>
										</a>
										<a href='#!'>
											<img
												src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp'
												alt='avatar'
												className='img-fluid rounded-circle me-1'
												width={35}
											/>
										</a>
										<a href='#!'>
											<img
												src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp'
												alt='avatar'
												className='img-fluid rounded-circle me-1'
												width={35}
											/>
										</a>
										<a href='#!'>
											<img
												src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp'
												alt='avatar'
												className='img-fluid rounded-circle me-3'
												width={35}
											/>
										</a>
										<button
											type='button'
											className='btn btn-outline-dark btn-sm btn-floating'
										>
											<i className='fas fa-plus' />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default UserProfile;
