import Editable from '../../admin/Editable';
import './MaterialText.css';

export default function MaterialText({ path, text }: { path: string; text: string }) {
  return (
    <p className="material-text">
      <Editable path={path} value={text} />
    </p>
  );
}
