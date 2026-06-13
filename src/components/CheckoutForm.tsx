import React, { useState, useId } from 'react';

/** Shape of the collected customer data. */
export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
}

interface FieldError {
  fullName?: string;
  email?: string;
  address?: string;
}

interface CheckoutFormProps {
  /** Called with validated data when the user submits the form. */
  onSubmit: (data: CheckoutFormData) => void;
  /** Called when the user clicks the back button. */
  onBack: () => void;
}

/**
 * Validates a single field and returns an error message or undefined.
 *
 * @param name - Field key to validate.
 * @param value - Current string value of the field.
 * @returns Error message string, or undefined when the field is valid.
 */
function validateField(
  name: keyof CheckoutFormData,
  value: string
): string | undefined {
  const trimmed = value.trim();

  if (name === 'fullName') {
    if (!trimmed) return 'El nombre es obligatorio.';
    if (trimmed.length < 3) return 'Ingresa al menos 3 caracteres.';
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmed))
      return 'Solo se permiten letras, espacios y guiones.';
  }

  if (name === 'email') {
    if (!trimmed) return 'El correo es obligatorio.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
      return 'Ingresa un correo electrónico válido.';
  }

  if (name === 'address') {
    if (!trimmed) return 'La dirección es obligatoria.';
    if (trimmed.length < 10)
      return 'La dirección debe tener al menos 10 caracteres.';
  }

  return undefined;
}

/**
 * Multi-field checkout form rendered inside the cart drawer.
 * Performs inline validation on blur and full validation on submit.
 * Uses the project's Material Design 3 token palette for styling.
 */
export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack }) => {
  const uid = useId();

  const [values, setValues] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({});

  /**
   * Updates field value and clears its error when the user starts retyping.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof CheckoutFormData; value: string };
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Validates the field that just lost focus (blur-time validation).
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof CheckoutFormData; value: string };
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof CheckoutFormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /**
   * Runs full validation on submit. Proceeds only when all fields are valid.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullNameError = validateField('fullName', values.fullName);
    const emailError = validateField('email', values.email);
    const addressError = validateField('address', values.address);

    setTouched({ fullName: true, email: true, address: true });
    setErrors({
      fullName: fullNameError,
      email: emailError,
      address: addressError,
    });

    if (!fullNameError && !emailError && !addressError) {
      onSubmit({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
      });
    }
  };

  // ─── Shared style builders ───────────────────────────────────────────────

  /**
   * Returns the Tailwind class string for an input/textarea border,
   * switching to error state when the field has been touched and has an error.
   */
  const inputBorderClass = (field: keyof CheckoutFormData) =>
    errors[field] && touched[field]
      ? 'border-error focus:outline-none focus:ring-1 focus:ring-error'
      : 'border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col h-full"
      aria-label="Formulario de envío"
    >
      {/* Section heading */}
      <div className="mb-6">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          Paso 2 de 2
        </p>
        <h3 className="font-headline-sm text-headline-sm text-black mt-1">
          Datos de envío
        </h3>
      </div>

      {/* Fields */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-5">

        {/* Full name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${uid}-fullName`}
            className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest"
          >
            Nombre completo
          </label>
          <input
            id={`${uid}-fullName`}
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. María Gómez"
            aria-describedby={errors.fullName && touched.fullName ? `${uid}-fullName-error` : undefined}
            aria-invalid={!!(errors.fullName && touched.fullName)}
            className={`w-full bg-white border px-3 py-3 font-body-md text-body-md text-black placeholder:text-on-surface-variant/50 transition-colors ${inputBorderClass('fullName')}`}
          />
          {errors.fullName && touched.fullName && (
            <p
              id={`${uid}-fullName-error`}
              role="alert"
              className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-0.5"
            >
              <span className="material-symbols-outlined text-[14px] leading-none" aria-hidden="true">
                error
              </span>
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${uid}-email`}
            className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest"
          >
            Correo electrónico
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. maria@correo.com"
            aria-describedby={errors.email && touched.email ? `${uid}-email-error` : undefined}
            aria-invalid={!!(errors.email && touched.email)}
            className={`w-full bg-white border px-3 py-3 font-body-md text-body-md text-black placeholder:text-on-surface-variant/50 transition-colors ${inputBorderClass('email')}`}
          />
          {errors.email && touched.email && (
            <p
              id={`${uid}-email-error`}
              role="alert"
              className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-0.5"
            >
              <span className="material-symbols-outlined text-[14px] leading-none" aria-hidden="true">
                error
              </span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${uid}-address`}
            className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest"
          >
            Dirección de entrega
          </label>
          <textarea
            id={`${uid}-address`}
            name="address"
            rows={3}
            autoComplete="street-address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. Calle 45 # 12-34, Apto 201, Bogotá"
            aria-describedby={errors.address && touched.address ? `${uid}-address-error` : undefined}
            aria-invalid={!!(errors.address && touched.address)}
            className={`w-full bg-white border px-3 py-3 font-body-md text-body-md text-black placeholder:text-on-surface-variant/50 resize-none transition-colors ${inputBorderClass('address')}`}
          />
          {errors.address && touched.address && (
            <p
              id={`${uid}-address-error`}
              role="alert"
              className="flex items-center gap-1 font-label-sm text-label-sm text-error mt-0.5"
            >
              <span className="material-symbols-outlined text-[14px] leading-none" aria-hidden="true">
                error
              </span>
              {errors.address}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col gap-3">
        <button
          type="submit"
          className="w-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest py-4 hover:bg-surface-tint transition-colors duration-300 cursor-pointer"
        >
          Continuar al recibo
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full border border-outline-variant text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest py-3 hover:bg-surface-container transition-colors duration-300 cursor-pointer"
        >
          ← Volver al carrito
        </button>
      </div>
    </form>
  );
};