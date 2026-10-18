export function Spinner() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <span
        className="rb-spin block rounded-full"
        style={{
          width: 40,
          height: 40,
          border: "3px solid rgba(20, 91, 70, 0.15)",
          borderTopColor: "var(--color-emerald-900)",
        }}
      />
    </div>
  );
}
