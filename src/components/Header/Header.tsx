import logo from '../../logo.svg';
import './Header.css';

type HeaderProps = {
  origin: string | null;
};

export default function Header(props: HeaderProps) {
  return (
    <div id="header">
      <img src={logo} alt="logo" />
      <div id="header-text">
        <h3>Networks Chunks</h3>
        <span>
          🌐 <b>Origin</b> : {props.origin || 'loading...'}
        </span>
      </div>
    </div>
  );
}
