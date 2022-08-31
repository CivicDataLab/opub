export default function ShareIcon({ ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.width ? props.width : '24px'}
      {...props}
    >
      <path d="M18 16.137c-.76 0-1.44.3-1.96.773l-7.13-4.167A3.3 3.3 0 0 0 9 12.04a3.3 3.3 0 0 0-.09-.703l7.05-4.126a2.98 2.98 0 0 0 2.04.813c1.66 0 3-1.345 3-3.012A3.002 3.002 0 0 0 18 2c-1.66 0-3 1.345-3 3.012 0 .241.04.472.09.703L8.04 9.84A2.98 2.98 0 0 0 6 9.028c-1.66 0-3 1.345-3 3.012a3.002 3.002 0 0 0 3 3.012c.79 0 1.5-.311 2.04-.813l7.12 4.177c-.05.21-.08.431-.08.652A2.93 2.93 0 0 0 18 22a2.93 2.93 0 0 0 2.92-2.932A2.93 2.93 0 0 0 18 16.137Z" />
    </svg>
  );
}
