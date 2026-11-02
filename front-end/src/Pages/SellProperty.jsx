import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  MapPin,
  DollarSign,
  FileText,
  Road,
  Zap,
  Droplets,
  Trees,
  ShieldCheck,
  User,
  FileCheck,
  Trash2,
  FileBadge,
  CheckCircle,
  Image as ImageIcon,
  X,
  Building2,
  Ruler,
  MapPinned,
  ArrowRight,
} from "lucide-react";
import { createProperty } from "../api/api";

const initialFormData = {
  title: "",
  propertyType: "",
  ownershipType: "",
  sellerType: "",
  sellerName: "",
  sellerPhone: "",
  sellerWhatsapp: "",
  aadhaarNo: "",
  panNo: "",
  price: "",
  isNegotiable: "",
  area: "",
  areaUnit: "",
  frontageFeet: "",
  depthFeet: "",
  facing: "",
  cornerPlot: "",
  roadWidth: "",
  naStatus: "",
  titleClear: "",
  zoneType: "",
  address: "",
  tpNumber: "",
  city: "",
  state: "",
  pincode: "",
  googleMapsLink: "",
  description: "",
};

const amenities = [
  { name: "Main Road Connectivity", icon: Road },
  { name: "Electricity Supply", icon: Zap },
  { name: "Water Supply / Borewell", icon: Droplets },
  { name: "Nearby Parks / Greenery", icon: Trees },
  { name: "24/7 Security / Boundary Wall", icon: ShieldCheck },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-[#c69b48] focus:ring-2 focus:ring-[#c69b48]/15";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

function Field({ label, required, children, className = "" }) {
  return (
    <div className={className}>
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  name,
  value,
  onChange,
  placeholder,
  options,
  required = true,
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`${inputClass} cursor-pointer`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Section({ icon: Icon, number, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-5 sm:px-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#102c50] text-[#e2bd72]">
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#bd9140]">
              STEP {number}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#102c50] sm:text-xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </div>
    </section>
  );
}

function UploadBox({
  title,
  subtitle,
  accept,
  multiple = false,
  inputRef,
  onChange,
  icon: Icon = Upload,
}) {
  return (
    <div className="relative flex min-h-[145px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c8d6e7] bg-[#f5f9ff] p-5 text-center transition hover:border-[#bd9140] hover:bg-[#fbf9f3]">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#bd9140] shadow-sm">
        <Icon size={21} />
      </div>
      <p className="text-sm font-bold text-[#102c50]">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      <span className="mt-3 rounded-lg bg-[#102c50] px-4 py-2 text-xs font-semibold text-white">
        Browse Files
      </span>
    </div>
  );
}

export default function SellProperty() {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [images, setImages] = useState([]);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [propertyDocs, setPropertyDocs] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const propDocInputRef = useRef(null);
  const imageUrlsRef = useRef([]);

  useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      imageUrlsRef.current = [];
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (name) => {
    setSelectedAmenities((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    imageUrlsRef.current.push(...newImages.map((img) => img.preview));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const image = prev[index];
      if (image) {
        URL.revokeObjectURL(image.preview);
        imageUrlsRef.current = imageUrlsRef.current.filter(
          (url) => url !== image.preview
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handlePropertyDocsUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newDocs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    imageUrlsRef.current.push(...newDocs.map((doc) => doc.preview));
    setPropertyDocs((prev) => [...prev, ...newDocs]);
    e.target.value = "";
  };

  const removePropertyDoc = (index) => {
    setPropertyDocs((prev) => {
      const doc = prev[index];
      if (doc) {
        URL.revokeObjectURL(doc.preview);
        imageUrlsRef.current = imageUrlsRef.current.filter(
          (url) => url !== doc.preview
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
    setSelectedAmenities([]);
    setAadhaarFile(null);
    setPanFile(null);

    images.forEach((img) => URL.revokeObjectURL(img.preview));
    propertyDocs.forEach((doc) => URL.revokeObjectURL(doc.preview));

    imageUrlsRef.current = [];
    setImages([]);
    setPropertyDocs([]);

    if (fileInputRef.current) fileInputRef.current.value = "";
    if (propDocInputRef.current) propDocInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to submit a property.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one property photo.");
      return;
    }

    if (!aadhaarFile || !panFile) {
      alert("Please upload both Aadhaar and PAN verification documents.");
      return;
    }

    try {
      setSubmitting(true);

      const propertyData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        propertyData.append(key, value ?? "");
      });

      propertyData.append("amenities", JSON.stringify(selectedAmenities));
      propertyData.append("aadhaarPhoto", aadhaarFile);
      propertyData.append("panPhoto", panFile);

      propertyDocs.forEach((doc) => {
        propertyData.append("propertyLegalDocs", doc.file);
      });

      images.forEach((image) => {
        propertyData.append("images", image.file);
      });

      const response = await createProperty(propertyData);

      alert(
        response.message ||
        "Property submitted successfully! It is now in Processing status."
      );

      resetForm();
    } catch (error) {
      console.error("Property submission error:", error);
      alert(error.message || "Property submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7fb] px-4 py-8 font-sans text-slate-800 sm:px-7 lg:px-10 lg:py-12">

      <div className="mx-auto max-w-6xl">

        {/* EXACT HERO BANNER MATCHING SCREENSHOT */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-[#090b0c] text-white shadow-xl border border-amber-200/40">
          <div className="absolute inset-0 opacity-45">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury land background"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e2bd72]">
                <span>LIST YOUR PROPERTY</span>
                <span className="h-[2px] w-8 bg-[#e2bd72]" />
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Sell Land &amp; <span className="text-[#e2bd72]">Plots</span>[cite: 14]
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                Provide complete plot details, legal documents and reach genuine buyers across Gujarat[cite: 14].
              </p>

              <div className="pt-2">
                <a
                  href="#sell-form"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:scale-105"
                >
                  <span>Start Selling Today</span>[cite: 14]
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center p-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-400 shadow-2xl backdrop-blur-md animate-bounce">
                <MapPin size={40} />
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form id="sell-form" onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION 1 */}
          <Section
            number="01"
            icon={User}
            title="Seller Contact & Verification (KYC)"
            description="Provide your contact information and identity verification details."
          >
            <Field label="I am" required>
              <SelectField
                name="sellerType"
                value={formData.sellerType}
                onChange={handleChange}
                placeholder="Select Seller Type"
                options={[
                  { value: "Owner", label: "Owner" },
                  { value: "Agent / Broker", label: "Agent / Broker" },
                  { value: "Builder / Developer", label: "Builder / Developer" },
                ]}
              />
            </Field>

            <Field label="Your Full Name" required>
              <input className={inputClass} name="sellerName" value={formData.sellerName} onChange={handleChange} placeholder="Enter your full name" required />
            </Field>

            <Field label="Mobile Number" required>
              <input className={inputClass} type="tel" name="sellerPhone" value={formData.sellerPhone} onChange={handleChange} placeholder="+91 9876543210" required />
            </Field>

            <Field label="WhatsApp Number" required>
              <input className={inputClass} type="tel" name="sellerWhatsapp" value={formData.sellerWhatsapp} onChange={handleChange} placeholder="+91 9876543210" required />
            </Field>

            <Field label="Aadhaar Number" required>
              <input className={inputClass} name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} placeholder="Enter Aadhaar Number" required />
            </Field>

            <Field label="PAN Card Number" required>
              <input className={inputClass} name="panNo" value={formData.panNo} onChange={handleChange} placeholder="Enter PAN Number" required />
            </Field>

            <Field label="Aadhaar Card Photo" required>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <input type="file" accept="image/*" required onChange={(e) => setAadhaarFile(e.target.files[0] || null)} className="w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#102c50] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
                {aadhaarFile && <p className="mt-2 truncate text-xs text-emerald-600">✓ {aadhaarFile.name}</p>}
              </div>
            </Field>

            <Field label="PAN Card Photo" required>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <input type="file" accept="image/*" required onChange={(e) => setPanFile(e.target.files[0] || null)} className="w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#102c50] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
                {panFile && <p className="mt-2 truncate text-xs text-emerald-600">✓ {panFile.name}</p>}
              </div>
            </Field>
          </Section>

          {/* SECTION 2 */}
          <Section
            number="02"
            icon={FileText}
            title="Basic Property Details"
            description="Enter the main information about the property you want to list."
          >
            <Field label="Property Title / Headline" required className="sm:col-span-2">
              <input className={inputClass} name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Prime NA Residential Plot near SP Ring Road" required />
            </Field>

            <Field label="Property Category" required>
              <SelectField name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Select Property Type" options={[
                { value: "Residential Plot", label: "Residential Plot" },
                { value: "Agricultural Land", label: "Agricultural Land" },
                { value: "Commercial Land", label: "Commercial Land" },
                { value: "Industrial Land", label: "Industrial Land" },
                { value: "Recreational Land", label: "Recreational Land" },
              ]} />
            </Field>

            <Field label="Ownership Type" required>
              <SelectField name="ownershipType" value={formData.ownershipType} onChange={handleChange} placeholder="Select Ownership Type" options={[
                { value: "Single Owner", label: "Single Owner" },
                { value: "Joint Ownership", label: "Joint Ownership" },
                { value: "Power of Attorney", label: "Power of Attorney" },
              ]} />
            </Field>
          </Section>

          {/* SECTION 3 */}
          <Section
            number="03"
            icon={FileCheck}
            title="Legal & Approval Status"
            description="Provide accurate legal and zoning information about the land."
          >
            <Field label="N.A. Status" required>
              <SelectField name="naStatus" value={formData.naStatus} onChange={handleChange} placeholder="Select N.A. Status" options={[
                { value: "NA Approved", label: "NA Approved" },
                { value: "Agricultural Land (Old Tenure)", label: "Agricultural Land (Old Tenure / જૂની શરત)" },
                { value: "Agricultural Land (New Tenure)", label: "Agricultural Land (New Tenure / નવી શરત)" },
                { value: "TP Scheme Approved", label: "TP Scheme Approved" },
              ]} />
            </Field>

            <Field label="Title Clear?" required>
              <SelectField name="titleClear" value={formData.titleClear} onChange={handleChange} placeholder="Select Title Status" options={[
                { value: "Yes", label: "Yes (Title Clear & Marketable)" },
                { value: "In Progress", label: "In Progress" },
              ]} />
            </Field>

            <Field label="Zone Type" required>
              <SelectField name="zoneType" value={formData.zoneType} onChange={handleChange} placeholder="Select Zone Type" options={[
                { value: "Residential Zone", label: "Residential Zone" },
                { value: "Commercial Zone", label: "Commercial Zone" },
                { value: "Industrial Zone", label: "Industrial Zone" },
                { value: "Green/Agricultural Zone", label: "Green/Agricultural Zone" },
              ]} />
            </Field>
          </Section>

          {/* SECTION 4 */}
          <Section
            number="04"
            icon={Ruler}
            title="Price & Plot Dimensions"
            description="Specify your expected price, land size and plot measurements."
          >
            <Field label="Expected Price (₹)" required>
              <input className={inputClass} name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 45,00,000" required />
            </Field>

            <Field label="Price Negotiable?" required>
              <SelectField name="isNegotiable" value={formData.isNegotiable} onChange={handleChange} placeholder="Select Price Type" options={[
                { value: "Yes", label: "Yes (Negotiable)" },
                { value: "Fixed Price", label: "Fixed Price" },
              ]} />
            </Field>

            <Field label="Total Size / Area" required>
              <div className="flex gap-2">
                <input className={`${inputClass} min-w-0`} type="number" min="0.01" step="any" name="area" value={formData.area} onChange={handleChange} placeholder="1200" required />
                <select className={`${inputClass} w-28 shrink-0 px-2`} name="areaUnit" value={formData.areaUnit} onChange={handleChange} required>
                  <option value="" disabled>Unit</option>
                  {["sq. yd", "sq. ft", "Acre", "Bigha", "Guntha"].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </Field>

            <Field label="Facing Direction" required>
              <SelectField name="facing" value={formData.facing} onChange={handleChange} placeholder="Select Facing" options={[
                { value: "East Facing", label: "East Facing" },
                { value: "West Facing", label: "West Facing" },
                { value: "North Facing", label: "North Facing" },
                { value: "South Facing", label: "South Facing" },
                { value: "Corner Plot", label: "Corner Plot" },
              ]} />
            </Field>

            <Field label="Frontage / Road Front (ft)">
              <input className={inputClass} type="number" min="0" name="frontageFeet" value={formData.frontageFeet} onChange={handleChange} placeholder="e.g. 40 ft" />
            </Field>

            <Field label="Plot Depth (ft)">
              <input className={inputClass} type="number" min="0" name="depthFeet" value={formData.depthFeet} onChange={handleChange} placeholder="e.g. 60 ft" />
            </Field>

            <Field label="Road Width" required>
              <SelectField name="roadWidth" value={formData.roadWidth} onChange={handleChange} placeholder="Select Road Width" options={[
                { value: "Main Road (60ft+)", label: "Main Road (60ft+)" },
                { value: "Internal Road (30ft/40ft)", label: "Internal Road (30ft/40ft)" },
                { value: "Touch Highway", label: "Touch Highway" },
                { value: "Service Road", label: "Service Road" },
              ]} />
            </Field>

            <Field label="Corner Plot?" required>
              <SelectField name="cornerPlot" value={formData.cornerPlot} onChange={handleChange} placeholder="Select Corner Plot" options={[
                { value: "Yes", label: "Yes (2 Side Roads)" },
                { value: "No", label: "No (1 Side Road)" },
              ]} />
            </Field>
          </Section>

          {/* SECTION 5 */}
          <Section
            number="05"
            icon={MapPinned}
            title="Location & Scheme Details"
            description="Add the property's complete address and map location."
          >
            <Field label="Complete Address or Landmark" required className="sm:col-span-2 lg:col-span-3">
              <input className={inputClass} name="address" value={formData.address} onChange={handleChange} placeholder="Plot No. 45, Science City Road, Near SP Ring Road" required />
            </Field>

            <Field label="TP No. / Revenue Survey No.">
              <input className={inputClass} name="tpNumber" value={formData.tpNumber} onChange={handleChange} placeholder="e.g. TP 44, Survey 120" />
            </Field>

            <Field label="City" required>
              <input className={inputClass} name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Ahmedabad" required />
            </Field>

            <Field label="State" required>
              <input className={inputClass} name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Gujarat" required />
            </Field>

            <Field label="Pincode">
              <input className={inputClass} name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" />
            </Field>

            <Field label="Google Maps Location Link (Optional)" className="sm:col-span-2">
              <input className={inputClass} type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} placeholder="https://maps.google.com/?q=..." />
            </Field>
          </Section>

          {/* SECTION 6 */}
          <Section
            number="06"
            icon={Upload}
            title="Amenities, Property Documents & Photos"
            description="Select available facilities and upload property documents and images."
          >
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={labelClass}>Available Features</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map(({ name, icon: Icon }) => {
                  const checked = selectedAmenities.includes(name);
                  return (
                    <button
                      type="button"
                      key={name}
                      onClick={() => handleAmenityToggle(name)}
                      aria-pressed={checked}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                        checked
                          ? "border-[#bd9140] bg-[#fbf7ed] text-[#102c50]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#bd9140]"
                      }`}
                    >
                      <Icon size={20} className="shrink-0 text-[#bd9140]" />
                      <span className="text-xs font-semibold">{name}</span>
                      {checked && <CheckCircle size={16} className="ml-auto text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LEGAL DOCUMENTS */}
            <div className="border-t border-slate-100 pt-6 sm:col-span-2 lg:col-span-3">
              <div className="mb-3 flex items-center gap-2">
                <FileBadge size={19} className="text-[#bd9140]" />
                <label className="text-sm font-bold text-[#102c50]">
                  Upload Property Legal Documents
                </label>
              </div>

              <p className="mb-4 text-xs leading-5 text-slate-500">
                7/12 Utara, Sale Deed, Title Deed, NA Order etc. Multiple files allowed.
              </p>

              <UploadBox
                title="Upload Property Legal Files"
                subtitle="PDF or Images • Multiple files allowed"
                accept="image/*,.pdf"
                multiple
                inputRef={propDocInputRef}
                onChange={handlePropertyDocsUpload}
                icon={FileBadge}
              />

              {propertyDocs.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {propertyDocs.map((doc, idx) => (
                    <div key={doc.preview} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#bd9140]">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-700">Document #{idx + 1}</p>
                        <p className="truncate text-[10px] text-slate-500">{doc.file.name}</p>
                      </div>
                      <button type="button" onClick={() => removePropertyDoc(idx)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Remove document">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PROPERTY PHOTOS */}
            <div className="border-t border-slate-100 pt-6 sm:col-span-2 lg:col-span-3">
              <div className="mb-3 flex items-center gap-2">
                <ImageIcon size={19} className="text-[#bd9140]" />
                <label className="text-sm font-bold text-[#102c50]">
                  Upload Main Land / Plot Photos <span className="text-red-500">*</span>
                </label>
              </div>

              <p className="mb-4 text-xs text-slate-500">
                Upload clear photos of your land or plot. You can select multiple images.
              </p>

              <UploadBox
                title="Upload Property Photos"
                subtitle="JPG, PNG or WEBP • Multiple images allowed"
                accept="image/*"
                multiple
                inputRef={fileInputRef}
                onChange={handleImageUpload}
                icon={ImageIcon}
              />

              {images.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {images.map((img, idx) => (
                    <div key={img.preview} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img src={img.preview} alt={`Property ${idx + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        aria-label={`Remove image ${idx + 1}`}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white">
                        Photo {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* SECTION 7 */}
          <Section
            number="07"
            icon={FileText}
            title="Detailed Description"
            description="Tell buyers more about your property and its advantages."
          >
            <Field label="Property Description" className="sm:col-span-2 lg:col-span-3">
              <textarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe soil type, nearby developments, connectivity to highway, surrounding environment, or investment potential..."
                className={`${inputClass} resize-y`}
              />
            </Field>
          </Section>

          {/* SUBMIT AREA */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-start gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#bd9140]" size={22} />
              <div>
                <h3 className="text-sm font-bold text-[#102c50]">
                  Ready to list your property?
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Please review all the details before submitting. Your property will be sent for admin verification.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#102c50] px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#183e6b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Submitting Property...
                </>
              ) : (
                <>
                  <Upload size={19} className="text-[#e2bd72]" />
                  Post Property For Sale
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              By submitting, you confirm that the information provided is accurate.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}