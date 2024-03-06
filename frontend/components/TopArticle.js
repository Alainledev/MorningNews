import { useDispatch } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import styles from '../styles/Toparticle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';


function TopArticle(props) {

	const dispatch = useDispatch();

	const handleBookmarkClick = () => {
		if (props.isBookmarked) {
			dispatch(removeBookmark(props));
		} else {
			dispatch(addBookmark(props));
		}
	}

	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	const goToArticle = (event) => {
		// Empêcher le comportement par défaut du lien
		event.preventDefault();
		// Ouvre l'URL de l'article dans un nouvel onglet
		window.open(props.url, '_blank');
	}	

	return (
		<div className={styles.topContainer}>
			<img src={props.urlToImage} className={styles.image} alt={props.title} />
			<div className={styles.topText}>
				<h3 className={styles.topTitle}>{props.title}</h3>
				<FontAwesomeIcon icon={faBookmark} onClick={() => handleBookmarkClick()} style={iconStyle} className={styles.bookmarkIcon} />
				<h4>{props.author}</h4>
				<a href={props.url} onClick={(event) => goToArticle(event)} className={styles.goToArticle} target="_blank" rel="noopener noreferrer">
					<p >{props.description}</p>
				</a>
			</div>
		</div>
	);
}

export default TopArticle;
