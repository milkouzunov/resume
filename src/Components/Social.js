export default function Social(network) {
  return (
    <li>
      <a href={network.url} target="_blank">
        <i className={"fa fa-" + network.name}></i>
      </a>
    </li>
  );
}
