import Chunk from '../Chunk/Chunk';
import './Chunks.css';

type ChunksProps = {
  chunks: string[];
  copyData: () => void;
  deleteData: () => void;
};

export default function Chunks(props: ChunksProps) {
  const { chunks, copyData, deleteData } = props;

  if (!chunks || !Array.isArray(chunks) || chunks.length === 0) {
    return (
      <div className="empty-state">
        <h1>!</h1>
        <p>No chunks found!</p>
      </div>
    );
  }

  const chunkChips = chunks.map((chunk: string) => {
    return <Chunk name={chunk} />;
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3>Chunks</h3>
        <div className="button-group">
          <button onClick={copyData}>📋 COPY</button>
          <button onClick={deleteData}>🗑 DELETE</button>
        </div>
      </div>
      <div className="chunks-container">{chunkChips}</div>
    </div>
  );
}
