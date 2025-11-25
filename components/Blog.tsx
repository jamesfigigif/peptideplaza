import React, { useState } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, Clock, Tag, MapPin, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group transition-colors font-medium"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </button>

      {/* Hero Image */}
      {post.image && (
        <div className="w-full h-96 rounded-3xl overflow-hidden mb-8 bg-slate-800 border border-slate-700">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-4">
          <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full font-bold text-xs uppercase tracking-wider">
            {post.category}
          </span>
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {post.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.publishDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-slate-400 mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-slate-700 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold text-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold">{post.author}</p>
              <p className="text-xs text-slate-500">Medical Researcher</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Copy link"
            >
              {copied ? <span className="text-xs text-teal-400">Copied!</span> : <LinkIcon size={18} />}
            </button>
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-colors">
              <Twitter size={18} />
            </button>
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-blue-700 text-slate-400 hover:text-white transition-colors">
              <Facebook size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-invert prose-lg max-w-none mb-12">
        <div className="text-slate-300 leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-8 border-b border-slate-700">
          <Tag size={16} className="text-slate-500" />
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-sm transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-teal-600/10 to-teal-500/10 border border-teal-500/30 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Ready to Order Premium Research Peptides?</h3>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          All products are 99%+ purity verified by HPLC/MS. Fast worldwide shipping. Bitcoin & Ethereum accepted.
        </p>
        <button
          onClick={onBack}
          className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg"
        >
          Browse Catalog
        </button>
      </div>
    </div>
  );
};

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onSelectPost }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-white mb-4">Research & Guides</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Expert insights on peptides, research findings, and comprehensive buying guides for researchers worldwide.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full border transition-all ${
              filter === cat
                ? 'bg-teal-500 border-teal-500 text-slate-900'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/30 hover:border-teal-500/50 transition-all duration-300 cursor-pointer"
          >
            {post.image && (
              <div className="w-full h-48 bg-slate-900 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="px-2 py-1 bg-teal-500/10 text-teal-400 rounded font-bold uppercase">
                  {post.category}
                </span>
                {post.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {post.location}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-teal-400 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {post.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
};

export { BlogPostView, BlogList };
