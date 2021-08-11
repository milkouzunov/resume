export default function Social(network) {
  return (
    <li>
      <a href={network.url}>
        <i className={"fa fa-" + network.name}></i>
      </a>
    </li>
  );
}
