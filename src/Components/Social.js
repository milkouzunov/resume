export default function Social({name, url, socialIcon}) {
  return (
    <li>
      <a href={url} rel="noreferrer" target="_blank">
        {socialIcon(name)}
      </a>
    </li>
  );
}
