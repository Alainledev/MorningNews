import { useDispatch } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

function Article(props) {
	const dispatch = useDispatch();

	const handleBookmarkClick = () => {
		if (props.isBookmarked) {
			dispatch(removeBookmark(props));
		} else {
			dispatch(addBookmark(props));
		}
	}

	const goToArticle = (event) => {
		// Empêcher le comportement par défaut du lien
		event.preventDefault();
		// Ouvrir l'URL de l'article dans un nouvel onglet
		window.open(props.url, '_blank');
	}	

	let iconStyle = {};
	if (props.isBookmarked) {
		iconStyle = { 'color': '#E9BE59' };
	}

	return (
		<div className={styles.articles}>
			<div className={styles.articleHeader}>
				<h3>{props.title}</h3>
				<FontAwesomeIcon icon={faBookmark} onClick={() => handleBookmarkClick()} style={iconStyle} className={styles.bookmarkIcon} />
			</div>
			<h4 className={styles.author}>- {props.author}</h4>
			<a href={props.url} onClick={(event) => goToArticle(event)} className={styles.goToArticle} target="_blank" rel="noopener noreferrer">
				<Image src={props.urlToImage} alt={props.title} width={600} height={314} />
				<div className={styles.description}>{props.description}</div>
			</a>
			<div className={styles.divider}></div>
		</div>
	);
}

export default Article;
