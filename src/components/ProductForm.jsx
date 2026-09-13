import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  description: "",
  category: "Chucherías",
  price: "",
  stock: "",
  capacity: "",
  weight: "",
  material: "",
  color: "",
  image: "",
  status: "available",
  featured: false,
  createdBy: "admin@germenmarket.com",
};

const categories = [
  "Chucherías",
  "Despensa",
  "Bebidas",
  "Carnes",
  "Embutidos",
  "Cocina",
  "Harinas y granos",
  "Salsas y condimentos",
  "Café y cacao",
  "Congelados",
];

const inputClass = "mt-2 w-full rounded-2xl border border-[#ead5db] bg-white px-4 py-3 text-sm text-[#2b1217] outline-none transition placeholder:text-[#a78f94] focus:border-[#8a0f2a] focus:ring-4 focus:ring-[#f2dbe1]";
const labelClass = "text-sm font-black text-[#442229]";

function ProductForm({ onSubmit, isSubmitting, initialData = null, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const isEditing = Boolean(initialData?._id);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialForm,
        ...initialData,
        price: initialData.price?.toString() || "",
        stock: initialData.stock?.toString() || "",
        featured: Boolean(initialData.featured),
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <section id="gestion" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <form className="rounded-[2rem] border border-[#ead5db] bg-white p-6 shadow-[0_22px_60px_rgba(91,7,23,0.10)] lg:p-8" onSubmit={handleSubmit}>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8a0f2a]">Panel interno</p>
              <h2 className="mt-3 font-serif text-4xl font-bold text-[#5b0717]">
                {isEditing ? "Editar producto" : "Agregar producto"}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-[#6f555a]">
                Área de gestión para usuarios con privilegios. La vista cliente mantiene una experiencia de compra limpia y segura.
              </p>
            </div>
            {isEditing && (
              <button
                type="button"
                className="rounded-full border border-[#8a0f2a] bg-white px-5 py-2.5 text-sm font-black text-[#8a0f2a] transition hover:bg-[#8a0f2a] hover:text-white"
                onClick={onCancel}
              >
                Cancelar edición
              </button>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <label className={labelClass}>
              Nombre
              <input className={inputClass} name="name" value={form.name} onChange={handleChange} placeholder="Ej. Harina P.A.N. blanca" required />
            </label>

            <label className={labelClass}>
              Categoría
              <select className={inputClass} name="category" value={form.category} onChange={handleChange} required>
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              Precio
              <input className={inputClass} name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
            </label>

            <label className={labelClass}>
              Stock
              <input className={inputClass} name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
            </label>

            <label className={labelClass}>
              Presentación
              <input className={inputClass} name="capacity" value={form.capacity} onChange={handleChange} placeholder="Ej. 1 kg / 500 g / 330 ml" required />
            </label>

            <label className={labelClass}>
              Peso / contenido
              <input className={inputClass} name="weight" value={form.weight} onChange={handleChange} placeholder="Ej. 1 kg" required />
            </label>

            <label className={labelClass}>
              Origen / ingredientes
              <input className={inputClass} name="material" value={form.material} onChange={handleChange} placeholder="Ej. Venezuela / maíz precocido" required />
            </label>

            <label className={labelClass}>
              Tipo / sabor
              <input className={inputClass} name="color" value={form.color} onChange={handleChange} placeholder="Ej. Blanco / picante / chocolate" required />
            </label>

            <label className={labelClass}>
              URL de imagen
              <input className={inputClass} name="image" value={form.image} onChange={handleChange} placeholder="https://... o /images/producto.jpg" />
            </label>

            <label className={labelClass}>
              Estado
              <select className={inputClass} name="status" value={form.status} onChange={handleChange}>
                <option value="available">Disponible</option>
                <option value="out_of_stock">Sin stock</option>
                <option value="draft">Borrador</option>
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-[#ead5db] bg-[#fff8f5] px-4 py-3 text-sm font-black text-[#442229]">
              <input className="h-5 w-5 accent-[#8a0f2a]" type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Producto destacado
            </label>
          </div>

          <label className={`${labelClass} mt-5 block`}>
            Descripción
            <textarea className={`${inputClass} min-h-32 resize-y`} name="description" value={form.description} onChange={handleChange} rows="4" required />
          </label>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-gradient-to-r from-[#7a0c24] to-[#9e1231] px-8 py-3.5 text-sm font-black text-white shadow-[0_14px_28px_rgba(138,15,42,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : isEditing ? "Actualizar producto" : "Guardar producto"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
