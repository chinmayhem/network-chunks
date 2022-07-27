import './Chunk.css';

type ChunkProps = {
  name: string;
};

export default function Chunk(props: ChunkProps) {
  return (
    <span className="chunk-chip" key={props.name}>
      {props.name}
    </span>
  );
}
