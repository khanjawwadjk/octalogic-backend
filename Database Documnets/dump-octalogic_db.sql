--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2023-11-15 22:18:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 2269 (class 2753 OID 25057)
-- Name: gist_int_ops; Type: OPERATOR FAMILY; Schema: public; Owner: postgres
--

CREATE OPERATOR FAMILY public.gist_int_ops USING gist;
ALTER OPERATOR FAMILY public.gist_int_ops USING gist ADD
    OPERATOR 1 =(integer,integer) ,
    OPERATOR 2 <(integer,integer) ,
    OPERATOR 3 <=(integer,integer) ,
    OPERATOR 4 >(integer,integer) ,
    OPERATOR 5 >=(integer,integer) ,
    FUNCTION 3 (integer, integer) int4le(integer,integer) ,
    FUNCTION 4 (integer, integer) int4gt(integer,integer);


ALTER OPERATOR FAMILY public.gist_int_ops USING gist OWNER TO postgres;

--
-- TOC entry 2095 (class 2616 OID 25058)
-- Name: gist_int_ops; Type: OPERATOR CLASS; Schema: public; Owner: postgres
--

CREATE OPERATOR CLASS public.gist_int_ops
    FOR TYPE integer USING gist FAMILY public.gist_int_ops AS
    FUNCTION 1 (integer, integer) int4eq(integer,integer) ,
    FUNCTION 2 (integer, integer) int4lt(integer,integer) ,
    FUNCTION 5 (integer, integer) int4ge(integer,integer);


ALTER OPERATOR CLASS public.gist_int_ops USING gist OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 25838)
-- Name: rentals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rentals (
    rental_id integer NOT NULL,
    first_name text,
    last_name text,
    number_of_wheels text,
    wheel_id integer,
    vehicle_type text,
    vehicle_type_id integer,
    model text,
    vehicle_id_for_model_name integer,
    rental_start_date timestamp without time zone,
    rental_end_date timestamp without time zone
);


ALTER TABLE public.rentals OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25837)
-- Name: rentals_rental_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rentals_rental_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rentals_rental_id_seq OWNER TO postgres;

--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 218
-- Name: rentals_rental_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rentals_rental_id_seq OWNED BY public.rentals.rental_id;


--
-- TOC entry 217 (class 1259 OID 24872)
-- Name: vehicle_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_types (
    type_id integer NOT NULL,
    type_name text,
    wheel_id integer
);


ALTER TABLE public.vehicle_types OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24871)
-- Name: vehicle_types_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicle_types_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicle_types_type_id_seq OWNER TO postgres;

--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 216
-- Name: vehicle_types_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicle_types_type_id_seq OWNED BY public.vehicle_types.type_id;


--
-- TOC entry 213 (class 1259 OID 24811)
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    vehicle_id integer NOT NULL,
    type_id integer,
    model text
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24810)
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicles_vehicle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicles_vehicle_id_seq OWNER TO postgres;

--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 212
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicles_vehicle_id_seq OWNED BY public.vehicles.vehicle_id;


--
-- TOC entry 215 (class 1259 OID 24853)
-- Name: wheels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wheels (
    wheel_id integer NOT NULL,
    number_of_wheels text
);


ALTER TABLE public.wheels OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24852)
-- Name: wheels_wheel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wheels_wheel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wheels_wheel_id_seq OWNER TO postgres;

--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 214
-- Name: wheels_wheel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.wheels_wheel_id_seq OWNED BY public.wheels.wheel_id;


--
-- TOC entry 3501 (class 2604 OID 25841)
-- Name: rentals rental_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rentals ALTER COLUMN rental_id SET DEFAULT nextval('public.rentals_rental_id_seq'::regclass);


--
-- TOC entry 3500 (class 2604 OID 24875)
-- Name: vehicle_types type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_types ALTER COLUMN type_id SET DEFAULT nextval('public.vehicle_types_type_id_seq'::regclass);


--
-- TOC entry 3498 (class 2604 OID 24814)
-- Name: vehicles vehicle_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles ALTER COLUMN vehicle_id SET DEFAULT nextval('public.vehicles_vehicle_id_seq'::regclass);


--
-- TOC entry 3499 (class 2604 OID 24856)
-- Name: wheels wheel_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wheels ALTER COLUMN wheel_id SET DEFAULT nextval('public.wheels_wheel_id_seq'::regclass);


--
-- TOC entry 3660 (class 0 OID 25838)
-- Dependencies: 219
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rentals (rental_id, first_name, last_name, number_of_wheels, wheel_id, vehicle_type, vehicle_type_id, model, vehicle_id_for_model_name, rental_start_date, rental_end_date) FROM stdin;
1	jawwad	khan	2	1	Sports	5	BMW S1000 RR	14	2023-11-15 00:00:00	2023-11-18 00:00:00
\.


--
-- TOC entry 3658 (class 0 OID 24872)
-- Dependencies: 217
-- Data for Name: vehicle_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicle_types (type_id, type_name, wheel_id) FROM stdin;
1	Hatchback	2
2	Sedan	2
3	SUV	2
4	Cruiser	1
5	Sports	1
\.


--
-- TOC entry 3654 (class 0 OID 24811)
-- Dependencies: 213
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicles (vehicle_id, type_id, model) FROM stdin;
3	1	Hyundai i20
10	4	RE Classic 350
11	4	Kawasaki Vulcan
12	4	Jawa Perak
13	5	Duke 250
15	5	Kawasaki Ninja 300
7	2	Hyundai Verna
8	2	Maruti Dzire
9	2	Honda City
4	3	Hyundai Creta
5	3	Toyota Fortuner
6	3	Mahindra Thar
1	1	Maruti Swift
2	1	Maruti Baleno
14	5	BMW S1000 RR
\.


--
-- TOC entry 3656 (class 0 OID 24853)
-- Dependencies: 215
-- Data for Name: wheels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wheels (wheel_id, number_of_wheels) FROM stdin;
1	2
2	4
\.


--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 218
-- Name: rentals_rental_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rentals_rental_id_seq', 1, true);


--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 216
-- Name: vehicle_types_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicle_types_type_id_seq', 5, true);


--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 212
-- Name: vehicles_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicles_vehicle_id_seq', 15, true);


--
-- TOC entry 3674 (class 0 OID 0)
-- Dependencies: 214
-- Name: wheels_wheel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wheels_wheel_id_seq', 2, true);


--
-- TOC entry 3509 (class 2606 OID 25845)
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (rental_id);


--
-- TOC entry 3507 (class 2606 OID 24879)
-- Name: vehicle_types vehicle_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_types
    ADD CONSTRAINT vehicle_types_pkey PRIMARY KEY (type_id);


--
-- TOC entry 3503 (class 2606 OID 24819)
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 3505 (class 2606 OID 24860)
-- Name: wheels wheels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wheels
    ADD CONSTRAINT wheels_pkey PRIMARY KEY (wheel_id);


--
-- TOC entry 3513 (class 2606 OID 25856)
-- Name: rentals rentals_vehicle_id_for_model_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_vehicle_id_for_model_name_fkey FOREIGN KEY (vehicle_id_for_model_name) REFERENCES public.vehicles(vehicle_id);


--
-- TOC entry 3512 (class 2606 OID 25851)
-- Name: rentals rentals_vehicle_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_vehicle_type_id_fkey FOREIGN KEY (vehicle_type_id) REFERENCES public.vehicle_types(type_id);


--
-- TOC entry 3511 (class 2606 OID 25846)
-- Name: rentals rentals_wheel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_wheel_id_fkey FOREIGN KEY (wheel_id) REFERENCES public.wheels(wheel_id);


--
-- TOC entry 3510 (class 2606 OID 24880)
-- Name: vehicle_types vehicle_types_wheel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_types
    ADD CONSTRAINT vehicle_types_wheel_id_fkey FOREIGN KEY (wheel_id) REFERENCES public.wheels(wheel_id);


-- Completed on 2023-11-15 22:18:13

--
-- PostgreSQL database dump complete
--

