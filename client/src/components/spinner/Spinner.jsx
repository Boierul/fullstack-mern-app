export default function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status' style={{color:"#df3ca6"}}>
        <span className='sr-only'></span>
      </div>
    </div>
  );
}
